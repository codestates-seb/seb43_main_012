import React, {
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  KeyboardEvent,
} from "react";

type InitProps = {
  inputType: string;
  qValue: string;
  setQValue: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  handleInput: () => void;
};

export type InputProps = {
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export function useInput({
  inputType,
  qValue,
  setQValue,
  placeholder,
  handleInput,
}: InitProps): InputProps {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // console.log("enter key pressed!");
      handleInput();
    }
  };

  return {
    type: inputType,
    value: qValue,
    onChange: handleChange,
    placeholder,
    onKeyDown: handleKeyDown,
  };
}

// export default useInput;
