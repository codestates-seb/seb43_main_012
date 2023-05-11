import { ReactElement } from 'react';
import {
  SearchBox,
  HistoryBox,
  HistoryHeader,
  Filtering,
  DeleteButton,
  HistoryBody,
  TimeLine,
} from '../styles/HistoryStyle';

function History(): ReactElement {
  return (
    <HistoryBox>
      <HistoryHeader>
        <SearchBox placeholder=" Search your history! tags (#node.js), title, content, date (3-15-2023, 3-2023)"></SearchBox>
        <Filtering>Neweast</Filtering>
        <DeleteButton>Clear History</DeleteButton>
      </HistoryHeader>
      <HistoryBody>
        <TimeLine>TODAY</TimeLine>
        <TimeLine>PREVIOUS 7DAYS</TimeLine>
      </HistoryBody>
    </HistoryBox>
  );
}

export default History;
