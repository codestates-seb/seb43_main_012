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

  const tempAnswer = `The error message you're seeing typically occurs when you're trying to access the 'map' function on an undefined or null value. To fix this issue, you need to ensure that the array you're trying to map over is defined and not empty.

  Here are a few steps you can take to troubleshoot and resolve the error:

  1. Check if the array you're trying to map over is properly initialized and assigned a value. Make sure it's not null or undefined.
  2. Verify that the array is populated with data before attempting to map over it. You can use console.log or debugger statements to inspect the array and confirm its contents.
  3. If the array is coming from an API call or an asynchronous operation, ensure that the data is successfully fetched and assigned to the array variable before attempting to map over it. You might need to use conditional rendering to handle cases where the data is still being fetched.
  4. If you're using props to pass the array to a child component, double-check that the props are correctly passed and received. Verify that the parent component is providing the array as expected.
  5. Consider using conditional rendering or default values to handle cases where the array might be empty or undefined.`;

  const handleInput = () => {
    //send dispatch to openai
    //update conversation data
    //for the very first time... when there is no data.
    if (!cValue.title)
      setCValue({
        ...cValue,
        title: qValue, //send another async request to update title to recommended title
        qnaList: [
          ...cValue.qnaList,
          {
            qnaId: 0,
            question: qValue,
            answer: 'some answer',
            bookmarkStatus: true,
          },
        ],
      });
    else
      setCValue({
        ...cValue,
        qnaList: [
          ...cValue.qnaList,
          {
            qnaId: cValue.qnaList.length,
            question: qValue,
            answer: tempAnswer,
            bookmarkStatus: true,
          },
        ],
      });
    //update the QnA.
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
