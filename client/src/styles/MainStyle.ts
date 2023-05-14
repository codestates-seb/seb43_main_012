import styled from 'styled-components';
import { InputQBox } from './InputStyle';

export const MainBox = styled.main`
  display: flex;
  flex-direction: column;
  min-width: var(--size-minwidth-pc-main);
  padding-top: 20px;
  width: 100%;
`;

export const FixedTopBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 997;
`;
export const TitleBox = styled.title`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-width: var(--size-minwidth-pc-main);
  width: 100%;
  padding: 50px 15px 30px 15px;
  letter-spacing: -0.03em;

  // &:first-child {

  // }

  h1 {
    font-size: var(--text-fontsize-title);
    font-weight: var(--text-fontweight-medium);
    line-height: 32px;
    width: 80%;
    max-width: 700px;
  }

  & > :nth-child(2) {
    align-self: flex-start;
  }
`;

export const InputTitleBox = styled(InputQBox)`
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  // margin-top: -5px;
  line-height: 32px;
  max-width: 700px;
  input {
    min-height: 0;
    box-shadow: none;
    border: 1px solid var(--color-default-border);
    border-radius: 3px;
    font-size: var(--text-fontsize-title);
    font-weight: var(--text-fontweight-medium);
    width: 100%;
    letter-spacing: -0.03em;
    padding: 0;
  }
`;

export const EditSaveUIBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  margin: 0 5px;

  button {
    padding: 3px;
    margin: 0 3px;
  }
`;
