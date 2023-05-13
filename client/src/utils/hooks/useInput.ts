import { useState, ChangeEvent } from "react";

type InitProps = {
  initVal: string;
  inputType: string;
};

export type InputProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type: string;
};

export function useInput({ initVal, inputType }: InitProps): InputProps {
  const [value, setValue] = useState(initVal);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange: handleChange,
    type: inputType,
  };
}

// export default useInput;
