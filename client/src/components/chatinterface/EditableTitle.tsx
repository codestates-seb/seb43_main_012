import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from 'react';

//import data types
import { Conversation } from '../../data/d';

//import components
import { useInput } from '../../utils/hooks/useInput';
import Input from './Input';

//import style
import styled from 'styled-components';
import { InputTitleBox } from '../../styles/MainStyle';
import { InputCount } from '../../styles/InputStyle';

//import api
import { editTitle } from '../../api/ChatInterfaceApi';

//import reducers
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  changeTitle,
  selectCId,
  selectCTitle,
  selectConversation,
} from '../../features/main/conversationSlice';

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputCount2 = styled(InputCount)`
  padding-top: 5px;
  width: 100%;
`;

type Props = {
  // cValue: Conversation;
  // setCValue: Dispatch<SetStateAction<Conversation>>;
  editState: boolean;
  setEditState: Dispatch<SetStateAction<boolean>>;
  editConfirm: boolean;
};
const EditableTitle = ({
  // cValue,
  // setCValue,
  editState,
  setEditState,
  editConfirm,
}: Props) => {
  const cTitle = useAppSelector(selectCTitle);
  const cId = useAppSelector(selectCId);
  const [value, setValue] = useState<string>(cTitle);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (value !== cTitle) setValue(cTitle);
  }, [cTitle, editState]);

  useEffect(() => {
    // console.log('edit state changed');

    if (editConfirm) {
      //update the conversation
      if (value !== cTitle) {
        (async function () {
          const res = await editTitle({
            id: cId,
            title: value,
          });
          if (res) {
            // console.log('edit title success!');
            dispatch(changeTitle(value));
          }
        })();
      }
    }
  }, [editState]);

  const handleTitleChange = () => {
    // console.log('did this even happen');

    //only send if the input value has something
    if (value) {
      //add dispatch function to update conversation title in data!
      (async function () {
        const res = await editTitle({
          id: cId,
          title: value,
        });
        if (res) {
          console.log('edit title success!');
          dispatch(changeTitle(value));
        }
      })();
    } else dispatch(changeTitle(value));
    setEditState(false);
  };

  const InputTitleProps = useInput({
    inputType: 'text',
    value,
    setValue,
    handleInput: handleTitleChange,
    id: 'titleInput',
    maxlength: 70,
  });

  const InputTitle = Input({
    StyledComponent: InputTitleBox,
    inputProps: InputTitleProps,
    inputExists: Boolean(value),
    handleInput: handleTitleChange,
  });

  // console.log('title length: ', cTitle.length);

  return (
    <>
      {editState ? (
        <TitleBox>
          {InputTitle}
          <InputCount2>
            {value.length}/<span>100</span>
          </InputCount2>
        </TitleBox>
      ) : (
        <h1>{cTitle.length > 75 ? `${cTitle.slice(0, 75)}...` : cTitle}</h1>
      )}
    </>
  );
};

export default EditableTitle;
