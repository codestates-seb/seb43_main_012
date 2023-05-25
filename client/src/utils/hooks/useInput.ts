import React, {
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  KeyboardEvent,
} from 'react';

type InitProps = {
  inputType: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  handleInput: any;
  placeholder?: string;
  id?: string;
  maxlength?: number;
};

export type InputProps = {
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  id?: string;
  maxLength?: number;
};

export function useInput({
  inputType,
  value,
  setValue,
  handleInput,
  placeholder,
  id,
  maxlength,
}: InitProps): InputProps {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleInput(e);
    }
  };

  return {
    type: inputType,
    value,
    onChange: handleChange,
    placeholder,
    onKeyDown: handleKeyDown,
    id,
    maxLength: maxlength,
  };
}
