import styled from 'styled-components';
import { InputQBox } from './InputStyle';

type MainProps = {
  fixWidth?: boolean;
};

export const MainBackdrop = styled.div`
  position: fixed;
  top: var(--size-minheight-topnav: 105px);
  left: 0;
  display: flex;

  width: 100vw;
  height: 220px;
  background-color: rgba(255, 255, 255, 1);
  z-index: 990;
`;
export const MainBox = styled.main<MainProps>`
position: relative;
  display: flex;
  flex-direction: column;
  min-width: var(--size-minwidth-pc-main);
  padding-top: 20px;
  // width: 100%;
  margin: 0 auto;
  // background: white;
  z-index: 998;
  height: 100%;
  padding; 20px;
`;

export const FixedTopBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 80px;
  z-index: 997;
  width: 100%;
`;
export const TitleBox = styled.title`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-width: var(--size-minwidth-pc-main);
  width: 100%;
  max-width: var(--size-maxwidth-pc-main);
  padding: 50px 15px 30px 15px;
  letter-spacing: -0.03em;
  z-index: 990;

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
  width: 100%;
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

export const QnAListBox = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 20px 0 -50px;
  height: 100%;
  margin-top: 220px;
  max-height: 60vh;
  overflow-y: scroll;

  letter-spacing: -0.03em;
  line-height: 180%;
`;

export const QnAItemBox = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

export const QnAItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 50px;
  width: 100%;
  padding: 10px 0;
  padding-right: 20px;
`;

export const QnACheckbox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 40px;
  height: 100%;
`;
export const QnATitle = styled.title`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: var(--color-default-yellow-50);
  font-size: 18px;
  font-weight: 400;
  padding: 5px 10px;
  width: 100%:
`;

export const QnAAnswer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
  padding: 5px 0;
`;

//change this Center value to center the Q and A without the checkbox
export const Center = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 150px;

  img {
    filter: sepia(40%);
  }
`;
