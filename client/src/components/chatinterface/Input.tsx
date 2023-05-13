import { StyledComponent } from "styled-components";

type Props = {
  StyledComponent: StyledComponent<any, any, any, any>;
  inputName?: string;
  inputProps: {
    [key: string]: any;
  };
};

function Input({ StyledComponent, inputName, inputProps }: Props) {
  return (
    <StyledComponent>
      {Boolean(inputName) && <label>{inputName}</label>}
      <input {...inputProps} />
    </StyledComponent>
  );
}

export default Input;
