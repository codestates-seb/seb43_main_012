import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from 'react';
import { Conversation } from '../../data/dataTypes';
import { useInput } from '../../utils/hooks/useInput';
import Input from './Input';
import { InputTitleBox } from '../../styles/MainStyle';

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
    if (editConfirm) {
      if (value) setCValue((prev) => ({ ...prev, title: value }));
      else setValue(cValue.title);
      //add dispatch function to update conversation title in data!
    }
  }, [editState]);

  const handleTitleChange = () => {
    if (value) setCValue((prev) => ({ ...prev, title: value }));
    else setValue(cValue.title);
    //add dispatch function to update conversation title in data!
    setEditState(false);
  };

  const InputTitleProps = useInput({
    inputType: 'text',
    value,
    setValue,
    handleInput: handleTitleChange,
    id: 'titleInput',
  });

  const InputTitle = Input({
    StyledComponent: InputTitleBox,
    inputProps: InputTitleProps,
    inputExists: Boolean(value),
    handleInput: handleTitleChange,
  });

  return <>{editState ? InputTitle : <h1>{cValue.title}</h1>}</>;
};

export default EditableTitle;
