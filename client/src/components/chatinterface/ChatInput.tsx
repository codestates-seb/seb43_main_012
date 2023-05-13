import { useInput } from "../../utils/hooks/useInput";
import Input from "./Input";
import { InputQBox } from "../../styles/InputStyle";

const ChatInput = () => {
  const qBoxProps = useInput({ initVal: "", inputType: "text" });
  const questionInput = Input({
    StyledComponent: InputQBox,
    inputProps: qBoxProps,
  });

  return questionInput;
};

export default ChatInput;
