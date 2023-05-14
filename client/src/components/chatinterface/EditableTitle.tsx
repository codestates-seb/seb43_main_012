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
  }, [cValue]);

  useEffect(() => {
    if (editConfirm) {
      setCValue((prev) => ({ ...prev, title: value }));
    }
  }, [editState]);

  const handleTitleChange = () => {
    setCValue((prev) => ({ ...prev, title: value }));
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
