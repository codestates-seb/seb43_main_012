import { ReactElement, useState, useEffect } from 'react';
import {
  SearchBox,
  HistoryBox,
  HistoryHeader,
  Filtering,
  DeleteButton,
  HistoryBody,
  TimeBox,
  DateContainer,
  DateButton,
  ContentContainer,
  ContentWraper,
  Content,
} from '../styles/HistoryStyle';

import data from "../data/data.json";
import { ALL } from 'dns';


function History(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // 현재 월을 기준으로 5개의 월을 확인할 수 있는 버튼
  // 현: 5월 >> 버튼: 5월 4월 3월 2월 1월
  // 개수 줄이고 싶으면 length 줄이세요.
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [months, setMonths] = useState<string[]>([]);

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    const availableMonths = Array.from(
      { length: 5 },
      (_, index) => currentMonth - index,
    ).map((month) => {
      const adjustedMonth = month < 1 ? month + 12 : month;
      return new Date(
        new Date().getFullYear(),
        adjustedMonth - 1,
        1,
      ).toLocaleString('default', { month: 'long' });
    });
    setMonths(availableMonths);
  }, []);

  const handleMonthButtonClick = (month: any) => {
    setSelectedMonth(month);
  };


    //data를 받아서 map으로 돌리기
    const [content, setContent] = useState(data);
    const [selectedBookmark, setSelectedBookmark] = useState("All");
  

  return (
    <HistoryBox>
      <HistoryHeader>
        <SearchBox placeholder=" Search your history! tags (#node.js), title, content, date (3-15-2023, 3-2023)"></SearchBox>
        <Filtering>Neweast</Filtering>
        <DeleteButton>Clear History</DeleteButton>
      </HistoryHeader>
      <HistoryBody>
        <DateContainer>
          <DateButton>All</DateButton>
          <DateButton>Today</DateButton>
          <DateButton>7Days</DateButton>
          <DateButton>30Days</DateButton>
          {months.map((month, index) => (
            <DateButton
              key={index}
              onClick={() => handleMonthButtonClick(selectedMonth - index)}
            >
              {month}
            </DateButton>
          ))}
        </DateContainer>
        <ContentWraper>
          <ContentContainer>
            {content.chat
              .filter(
                (item) =>
                  selectedBookmark === "All" ||
                  item.bookmark === selectedBookmark,
              )
              .map(({ title, content, bookmark, tags, id }) => (
                <Content key={id} href="#">
                  <h3>{title}</h3>
                  <p>{content}</p>
                  <span className="bookmark">{bookmark}</span>
                  <div className="tag">
                    {tags.map((tag) => (
                      <span key={tag}>#{tag} </span>
                    ))}
                  </div>
                </Content>
              ))}
          </ContentContainer>
        </ContentWraper>
      </HistoryBody>
    </HistoryBox>
  );
}

export default History;
