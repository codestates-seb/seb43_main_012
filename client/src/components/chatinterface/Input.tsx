import { ReactElement, useEffect, useRef } from "react";
import { StyledComponent } from "styled-components";

type Props = {
  StyledComponent: StyledComponent<any, any, any, any>;
  inputName?: string;
  inputProps: {
    [key: string]: any;
  };
  inputExists: boolean;
  SVGStyledComponent?: StyledComponent<any, any, any, any>;
  SubmitSVGButton?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

function Input({
  StyledComponent,
  inputName,
  inputProps,
  inputExists,
  SVGStyledComponent,
  SubmitSVGButton,
}: Props): ReactElement {
  // useEffect(() => {
  //   console.log("inputExists: ", inputExists);
  // }, [inputExists]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    //페이지 로딩할 때 커서가 바로 focus 되기 위함
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <StyledComponent>
      {Boolean(inputName) && <label>{inputName}</label>}
      <input {...inputProps} ref={inputRef} />
      {SVGStyledComponent && SubmitSVGButton && (
        <button {...(inputExists ? {} : { disabled: true })}>
          <SubmitSVGButton />
        </button>
      )}
    </StyledComponent>
  );
}

export default Input;
