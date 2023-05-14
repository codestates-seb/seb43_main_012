import { useInput } from '../../utils/hooks/useInput';
import Input from './Input';
import { InputQBox, InputSubmitBtn } from '../../styles/InputStyle';
// @ts-ignore
import { ReactComponent as SubmitIcon } from '../../assets/icons/iconSubmit.svg';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Conversation } from '../../data/dataTypes';

type ChatProps = {
  cValue: Conversation;
  setCValue: Dispatch<SetStateAction<Conversation>>;
};
const ChatInput = ({ cValue, setCValue }: ChatProps) => {
  const [qValue, setQValue] = useState<string>('');

  const handleInput = () => {
    //send dispatch to openai
    //update conversation data
    setCValue({ ...cValue, title: qValue });
    //empty qValue
    setQValue('');
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

  // useEffect(() => {
  //   console.log("qvalue: ", Boolean(qValue));
  // }, [qValue]);

  return questionInput;
};

export default ChatInput;
