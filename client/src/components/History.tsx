import { ReactElement, useState } from 'react';
import {
  SearchBox,
  HistoryBox,
  HistoryHeader,
  Filtering,
  DeleteButton,
  HistoryBody,
  TimeLine,
  TimeBox,
  HistoryBody2,
} from '../styles/HistoryStyle';


function History(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HistoryBox>
      <HistoryHeader>
        <SearchBox placeholder=" Search your history! tags (#node.js), title, content, date (3-15-2023, 3-2023)"></SearchBox>
        <Filtering>Neweast</Filtering>
        <DeleteButton>Clear History</DeleteButton>
      </HistoryHeader>
      <HistoryBody>
        <TimeLine>TODAY</TimeLine>
        <TimeBox>
          <div>content1</div>
          <div>content1</div>
          <div>content1</div>
          <div>content1</div>
          <div>content1</div>
          <div>content1</div>
          <div>content1</div>
          <div>content1</div>
        </TimeBox>
        <TimeLine>PREVIOUS 7DAYS</TimeLine>
        <TimeBox>
          <div>content1</div>
          <div>content1</div>
          <div>content1</div>
          <div>content1</div>
          <div>content1</div>
          <div>content1</div>
        </TimeBox>
      </HistoryBody>
      {isOpen &&(
        <HistoryBody2>
              <TimeLine>PREVIOUS 30DAYS</TimeLine>
              <TimeBox>
                <div>content1</div>
                <div>content1</div>
                <div>content1</div>
                <div>content1</div>
                <div>content1</div>
                <div>content1</div>
                <div>content1</div>
                <div>content1</div>
              </TimeBox>
            </HistoryBody2>
      )}
      {!isOpen && <button onClick={handleClick}>see more</button>}
    </HistoryBox>
  );
}

export default History;
