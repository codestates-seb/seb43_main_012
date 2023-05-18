import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from 'react';

//import data types
import { Conversation } from '../../data/dataTypes';

//import components
import { useInput } from '../../utils/hooks/useInput';
import Input from './Input';

//import style
import styled from 'styled-components';
import { InputTitleBox } from '../../styles/MainStyle';
import { InputCount } from '../../styles/InputStyle';

//import api
import { editTitle } from '../../api/ChatInterfaceApi';

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
  cValue: Conversation;
  setCValue: Dispatch<SetStateAction<Conversation>>;
  editState: boolean;
  setEditState: Dispatch<SetStateAction<boolean>>;
  editConfirm: boolean;
};
const EditableTitle = ({
  cValue,
  setCValue,
  editState,
  setEditState,
  editConfirm,
}: Props) => {
  const [value, setValue] = useState<string>(cValue.title);

  useEffect(() => {
    if (value !== cValue.title) setValue(cValue.title);
  }, [cValue, editState]);

  useEffect(() => {
    console.log('edit state changed');

    if (editConfirm && value) {
      //update the conversation
      if (value !== cValue.title) {
        (async function () {
          const res = await editTitle({
            id: cValue.conversationId,
            title: value,
          });
          if (res) {
            console.log('edit title success!');
            setCValue((prev) => ({ ...prev, title: value }));
          }
        })();
        // editTitle({ id: cValue.conversationId, title: value });
      } else setValue(cValue.title);
      //add dispatch function to update conversation title in data!
    }
  }, [editState]);

  const handleTitleChange = () => {
    console.log('did this even happen');

    //only send if the input value has something
    if (value) {
      //add dispatch function to update conversation title in data!

      (async function () {
        const res = await editTitle({
          id: cValue.conversationId,
          title: value,
        });
        if (res) {
          console.log('edit title success!');
          setCValue((prev) => ({ ...prev, title: value }));
        }
      })();
    } else setValue(cValue.title);
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
        <h1>{cValue.title}</h1>
      )}
    </>
  );
};

export default EditableTitle;
