import styled from "styled-components";

export const InputQBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    width: 100%;
    min-height: 2.5rem;
    border: 1px solid #d9d9d9;
    border-radius: 0.5rem;
    // box-shadow: 2px 2px gray;
    box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.4);
    padding: 10px;
    outline: none;
    font-size: var(--text-font-size-qinput);
  }

  button {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.25rem;
    display: block;
    position: absolute;
    right: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    text-transform: none;
    text-decoration: none;
    outline: none;
    border: none;
    background-color: transparent;
    vertical-align: center;
    color: var(--color-default-yellow);
    cursor: pointer;

    svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }
  }
  button: disabled {
    cursor: default;
    color: var(--color-default-inactive);
  }
`;

export const InputQ = styled.input``;

export const InputSubmitBtn = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.25rem;
  display: block;
  position: absolute;
  right: 0.5rem;
  text-transform: none;
  text-decoration: none;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
`;
