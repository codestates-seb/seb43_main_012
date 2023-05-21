import { ReactElement, useState, useEffect } from 'react';
import {
  SearchBox,
  HistoryBox,
  HistoryHeader,
  Filtering,
  DeleteButton,
  TimeLine,
  HistoryBody,
  DateContainer,
  TimeBox,
} from '../styles/HistoryStyle';

import ContentData from '../components/member/ContentData';

function History(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  // 클릭하면 열리는 모달 혹은 페이지가 필요할 경우 사용
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // 현재 월을 기준으로 2개의 월을 확인할 수 있는 버튼
  // 현: 5월 >> 버튼: 4월 3월
  // 개수 줄이고 싶으면 length 줄이세요.
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [months, setMonths] = useState<string[]>([]);

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const availableMonths = Array.from(
      { length: 2 },
      (_, index) => currentMonth - index,
    ).map((month) => {
      const adjustedMonth = month < 1 ? month + 12 : month;
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      return monthNames[adjustedMonth - 1];
    });
    setMonths(availableMonths);
  }, []);

  const handleMonthButtonClick = (month: any) => {
    setSelectedMonth(month);
  };

  return (
    <HistoryBox>
      <HistoryHeader>
        <SearchBox placeholder=" Search your history! tags (#node.js), title, content, date (3-15-2023, 3-2023)"></SearchBox>
        <Filtering>Newest</Filtering>
        <DeleteButton>Clear History</DeleteButton>
      </HistoryHeader>
      <HistoryBody>
        <DateContainer>
          <TimeLine>Today</TimeLine>
          <TimeBox>
            <ContentData></ContentData>
          </TimeBox>
          <TimeLine>7Days</TimeLine>
          <TimeBox>
            <ContentData></ContentData>
          </TimeBox>
          <TimeLine>30Days</TimeLine>
          <TimeBox>
            <ContentData></ContentData>
          </TimeBox>
          {months.map((month, index) => (
            <TimeLine
              key={index}
              onClick={() => handleMonthButtonClick(selectedMonth - index)}
            >
              {month}
            </TimeLine>
          ))}
        </DateContainer>
      </HistoryBody>
    </HistoryBox>
  );
}

export default History;
