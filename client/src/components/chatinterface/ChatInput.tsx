import { useInput } from "../../utils/hooks/useInput";
import Input from "./Input";
import { InputQBox, InputSubmitBtn } from "../../styles/InputStyle";
// @ts-ignore
import { ReactComponent as SubmitIcon } from "../../assets/icons/iconSubmit.svg";
import { useState, useEffect } from "react";

const ChatInput = () => {
  const [qValue, setQValue] = useState<string>("");

  const handleInput = () => {
    //send dispatch to openai
    //empty qValue
    // console.log("clicked submit button!");
    setQValue("");
  };

  const qBoxProps = useInput({
    inputType: "text",
    qValue,
    setQValue,
    placeholder: "What are you itching to know today?",
    handleInput,
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
