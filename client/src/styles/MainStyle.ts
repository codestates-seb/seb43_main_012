import styled from 'styled-components';
import { InputQBox } from './InputStyle';

type MainProps = {
  fixWidth?: boolean;
};

type BackdropProps = {
  isMax?: boolean;
};

export const MainBackdrop = styled.div<BackdropProps>`
  position: fixed;
  top: ${(props) => (props.isMax ? '30px' : 'var(--size-minheight-topnav)')};

   {
    ${(props) => (props.isMax ? `` : `left: 0`)}
  }
  // left: 0;
  display: flex;

  width: 100vw;
  max-width: ${(props) =>
    props.isMax ? 'var(--size-minwidth-pc-main)' : '100vw'};
  height: ${(props) => (props.isMax ? '150px' : '220px')};

  background-color: rgba(255, 255, 255, 1);
  z-index: 990;
`;
export const MainBox = styled.main<MainProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw;
  // min-width: var(--size-minwidth-pc-main);
  padding-top: 20px;
  margin: 0 auto;
  z-index: 998;
  height: 100%;
  padding; 20px;
`;

export const FixedTopBox = styled.div<BackdropProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${(props) => (props.isMax ? '50px' : '80px')};
  left: 0;
  z-index: 997;
  width: 100%;
  max-width: var(--size-minwidth-pc-main);
`;

export const FixedChatbox = styled(FixedTopBox)`
  max-width: var(--size-minwidth-pc-main);
  top: 50px;
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
  background-color: white;

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

export const QnAListBox = styled.ul<BackdropProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 20px 0 -50px;
  height: 100%;
  margin-top: ${(props) => (props.isMax ? '220px' : '250px')};
  max-height: 60vh;
  overflow-y: scroll;

  letter-spacing: -0.03em;
  line-height: 180%;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 6px;
    border-radius: 6px;
  }

  &:hover {
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
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
  justify-content: flex-start;
  align-items: center;
  border-radius: 20px;
  // background: var(--color-default-yellow-50);
  font-size: 18px;
  font-weight: 400;
  padding: 5px 10px;
  width: fit-content;
  background: linear-gradient(
    120deg,
    var(--color-default-yellow-50) 0%,
    var(--color-default-yellow-50) 100%
  );
  background-repeat: no-repeat;
  background-size: 100% 90%;
  background-position: 0 40%;

  &:hover {
    cursor: pointer;
    background: linear-gradient(
      120deg,
      var(--color-default-yellow) 0%,
      var(--color-default-yellow) 100%
    );
  }

  //style2
  // background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMjAwMTA5MDQvL0VOIgogICAgICAgICAgICAgICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+Cgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgICB3aWR0aD0iMWluIiBoZWlnaHQ9IjAuNWluIgogICAgIHZpZXdCb3g9IjAgMCAzMDAgMTUwIj4KICA8cGF0aAogICAgICAgIGZpbGw9IiNmZmUwMDAiIHN0cm9rZT0ibm9uZSIKICAgICAgICBkPSJNIDEyLjAwLDQ4LjAwCiAgICAgICAgICAgQyAxMi4wMCw1MC4wOSAxMS43OSw1NC45OSAxMi42MCw1Ni43MgogICAgICAgICAgICAgMTUuNTksNjMuMTggMjYuMDksNTYuNjQgMzMuMDAsNjMuMDAKICAgICAgICAgICAgIDMwLjg0LDYzLjE4IDIzLjA1LDYzLjg3IDIxLjgwLDY1LjAyCiAgICAgICAgICAgICAxOC4wMiw2Ny44OCAyMS4yOSw3Ni4zNSAyMS44MCw4MC4wMAogICAgICAgICAgICAgMjEuODAsODAuMDAgMjEuODAsODYuMDAgMjEuODAsODYuMDAKICAgICAgICAgICAgIDIxLjgwLDg2LjAwIDQwLjAwLDg3LjAwIDQwLjAwLDg3LjAwCiAgICAgICAgICAgICAzOS45Myw4OC44OCA0MC4wNiw5MS4wNCAzOC45OCw5Mi42OQogICAgICAgICAgICAgMzcuNTEsOTQuOTMgMzUuMTUsOTQuNzUgMzIuNTksOTYuMjAKICAgICAgICAgICAgIDI4LjMzLDk4LjYxIDI2Ljg3LDEwMi4yMiAyNy4zNCwxMDcuMDAKICAgICAgICAgICAgIDI3LjM0LDEwNy4wMCAzMC4wMiwxMjMuNDEgMzAuMDIsMTIzLjQxCiAgICAgICAgICAgICAzMS44MiwxMjUuNzUgNDAuMDEsMTI3Ljk1IDQzLjAwLDEyOC4wMAogICAgICAgICAgICAgNDMuMDAsMTI4LjAwIDg3LjAwLDEyOC4wMCA4Ny4wMCwxMjguMDAKICAgICAgICAgICAgIDg4LjA4LDEyMS41NiA5MS4xNiwxMjEuODAgOTcuMDAsMTIyLjA0CiAgICAgICAgICAgICA5Ny4wMCwxMjIuMDQgMTA5LjAwLDEyMy4wMCAxMDkuMDAsMTIzLjAwCiAgICAgICAgICAgICAxMDkuMDAsMTIzLjAwIDEyOC4wMCwxMjMuMDAgMTI4LjAwLDEyMy4wMAogICAgICAgICAgICAgMTI4LjAwLDEyMy4wMCAxODIuMDAsMTIyLjAwIDE4Mi4wMCwxMjIuMDAKICAgICAgICAgICAgIDE5NC41OCwxMjEuOTcgMTg4LjQyLDExOS4wMyAyMDEuMDAsMTE5LjAwCiAgICAgICAgICAgICAyMDEuMDAsMTE5LjAwIDI0My4wMCwxMTkuMDAgMjQzLjAwLDExOS4wMAogICAgICAgICAgICAgMjQzLjAwLDExOS4wMCAyNTguMDAsMTE4LjAwIDI1OC4wMCwxMTguMDAKICAgICAgICAgICAgIDI1OS41MywxMDkuMTAgMjY2LjAxLDExMy4zNyAyNzAuNDAsMTA5LjE1CiAgICAgICAgICAgICAyNzIuNjEsMTA3LjAzIDI3Mi4zMCwxMDAuODUgMjcyLjAwLDk4LjAwCiAgICAgICAgICAgICAyNzIuMDAsOTguMDAgMjgwLjAwLDk3LjAwIDI4MC4wMCw5Ny4wMAogICAgICAgICAgICAgMjgwLjAwLDk0LjEwIDI4MC4yNiw4OC41NSAyNzkuMjYsODYuMDIKICAgICAgICAgICAgIDI3Ni40OSw3OC45OCAyNjQuNjMsNzYuODggMjU4LjAwLDc2LjAwCiAgICAgICAgICAgICAyNjUuMTUsNjkuMTkgMjc2LjQwLDczLjAzIDI3NC44NSw2Mi4wNAogICAgICAgICAgICAgMjc0LjQ3LDU5LjM1IDI3My43Myw1OC44NSAyNzIuMDAsNTcuMDAKICAgICAgICAgICAgIDI4MS42OCw1My43NyAyODEuMDAsNTQuMjggMjgxLjAwLDQ0LjAwCiAgICAgICAgICAgICAyODEuMDAsNDQuMDAgMjU4LjAwLDQyLjM4IDI1OC4wMCw0Mi4zOAogICAgICAgICAgICAgMjUwLjAwLDQwLjg0IDI1MS40OCwzOC4wMyAyMzUuMDAsMzguMDAKICAgICAgICAgICAgIDIzNS4wMCwzOC4wMCAxODkuMDAsMzkuMDAgMTg5LjAwLDM5LjAwCiAgICAgICAgICAgICAxODkuMDAsMzkuMDAgMTc3LjAwLDM5LjgyIDE3Ny4wMCwzOS44MgogICAgICAgICAgICAgMTc3LjAwLDM5LjgyIDE1OS4wMCwzOC4wMCAxNTkuMDAsMzguMDAKICAgICAgICAgICAgIDE1OS4wMCwzOC4wMCAxMjguMDAsMzguMDAgMTI4LjAwLDM4LjAwCiAgICAgICAgICAgICAxMTYuOTAsMzguMDIgMTIwLjE2LDM5LjQwIDExMy4wMCw0MC42NwogICAgICAgICAgICAgMTEzLjAwLDQwLjY3IDk3LjAwLDQyLjE3IDk3LjAwLDQyLjE3CiAgICAgICAgICAgICA5Ny4wMCw0Mi4xNyA4Ny4wMCw0My44MyA4Ny4wMCw0My44MwogICAgICAgICAgICAgODcuMDAsNDMuODMgNTcuMDAsNDUuMDAgNTcuMDAsNDUuMDAKICAgICAgICAgICAgIDU3LjAwLDQ1LjAwIDMyLjAwLDQ4LjAwIDMyLjAwLDQ4LjAwCiAgICAgICAgICAgICAzMi4wMCw0OC4wMCAxMi4wMCw0OC4wMCAxMi4wMCw0OC4wMCBaIiAvPgo8L3N2Zz4K');
  // background-position: 50% 50%;
  // padding-left: 20px;
  // padding-right: 20px;
  // padding-top: 5px;
  // background-repeat: no-repeat;
  // background-size: cover;
  //style3
  // background: url(//s2.svgbox.net/pen-brushes.svg?ic=brush-1&color=fcfc88);
  // margin: -6px -6px;
  // padding: 2px 6px;
`;

export const QnAAnswer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
  padding: 5px 0;
  // overflow-x: hidden;
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
