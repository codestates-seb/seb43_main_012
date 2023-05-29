//import hooks
import { useInput } from '../../utils/hooks/useInput';
//import components
import Input from './Input';
//import style
import { InputQBox, InputSubmitBtn } from '../../styles/InputStyle';
// @ts-ignore
import { ReactComponent as SubmitIcon } from '../../assets/icons/iconSubmit.svg';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Conversation } from '../../data/d';
import { AxiosError, isAxiosError } from 'axios';

//import api
import {
  askFirstQuestion,
  continueConversation,
  getConversation,
} from '../../api/ChatInterfaceApi';

//import redux
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectCId } from '../../features/main/conversationSlice';
import { selectLoginState } from '../../features/member/loginInfoSlice';
import { setConversation } from '../../features/main/conversationSlice';
import { toggleModal } from '../../features/collection/collectionSlice';

type ChatProps = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  updateQNum: () => void;
  isMax?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
};
const ChatInput = ({
  isLoading,
  setIsLoading,
  updateQNum,
  isMax,
  setIsOpen,
}: ChatProps) => {
  const [qValue, setQValue] = useState<string>('');
  const cId = useAppSelector(selectCId);
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(selectLoginState);

  const handleInput = () => {
    //to determine if it's a new vs continued conversation
    if (cId > 0 && !isLoading) {
      (async function () {
        try {
          setIsLoading(true);
          const msg = await continueConversation(cId, qValue);
          // console.log('continued conversation: ', msg);
          dispatch(toggleModal(true));
          setQValue('');
          setIsLoading(false);
          updateQNum();
        } catch (error) {
          console.error('Error in continueConversation:', error);
          setIsLoading(false);
        }
      })();
    } else if (localStorage.getItem('token') && !isLoading) {
      (async function () {
        try {
          setIsLoading(true);
          const res = await askFirstQuestion(qValue);
          console.log('asked first Question: ', res);
          setIsLoading(false);
          setQValue('');

          //for now.. because there's no bookmarkList
          if (!res.bookmarkList) {
            const res2 = await getConversation(res.conversationId);
            dispatch(setConversation(res2));
          } else {
            dispatch(setConversation(res));
          }
          // setCValue(res);
        } catch (error) {
          console.error('Error in ask first question:', error);
          if (isAxiosError(error) && error.code === 'ECONNABORTED') {
            console.log('request timed out');
            alert('조금 있다가 다시 시도해주세요.');
          }
          setIsLoading(false);
        }
      })();
    } else if (!loggedIn) {
      if (!!setIsOpen) setIsOpen(true);
    }
  };

  const qBoxProps = useInput({
    inputType: 'text',
    value: qValue,
    setValue: setQValue,
    placeholder: 'What are you itching to know today?',
    handleInput,
    id: 'questionInput',
  });
  const questionInput = Input({
    StyledComponent: InputQBox,
    inputProps: qBoxProps,
    inputExists: Boolean(qValue),
    handleInput,
    SVGStyledComponent: InputSubmitBtn,
    SubmitSVGButton: SubmitIcon,
  });

  return questionInput;
};

export default ChatInput;
