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

//import api
import {
  askFirstQuestion,
  continueConversation,
  getConversation,
} from '../../api/ChatInterfaceApi';

//import redux
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectCId } from '../../features/main/conversationSlice';
import { setConversation } from '../../features/main/conversationSlice';

type ChatProps = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  updateQNum: () => void;
  isMax?: boolean;
};
const ChatInput = ({ setIsLoading, updateQNum, isMax }: ChatProps) => {
  const [qValue, setQValue] = useState<string>('');
  const cId = useAppSelector(selectCId);
  const dispatch = useAppDispatch();

  const handleInput = () => {
    //to determine if it's a new vs continued conversation
    if (cId !== -1) {
      (async function () {
        try {
          setIsLoading(true);
          const msg = await continueConversation(cId, qValue);
          console.log('continued conversation: ', msg);
          setIsLoading(false);
          setQValue('');
          updateQNum();
        } catch (error) {
          console.error('Error in continueConversation:', error);
        }
      })();
    } else if (localStorage.getItem('token')) {
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
        }
      })();
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
