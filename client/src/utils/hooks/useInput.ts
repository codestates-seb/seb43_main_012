import React, { useState, ChangeEvent } from "react";

type InitProps = {
  inputType: string;
  qValue: string;
  setQValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
};

export type InputProps = {
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export function useInput({
  inputType,
  qValue,
  setQValue,
  placeholder,
}: InitProps): InputProps {
  // const [value, setValue] = useState(initVal);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQValue(e.target.value);
  };

  return {
    type: inputType,
    value: qValue,
    onChange: handleChange,
    placeholder,
  };
}

// export default useInput;
