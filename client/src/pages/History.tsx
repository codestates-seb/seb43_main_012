import { ReactElement, useState, useEffect } from 'react';
import {
  SearchBox,
  HistoryBox,
  HistoryHeader,
  FilterBox,
  DeleteButton,
  HistoryBody,
  ReloadBox,
} from '../styles/HistoryStyle';
import { ReactComponent as ReloadBtn } from '../assets/icons/history/iconReload.svg';

import HistoryData from '../components/history/HistoryData';
import ModalHistoryItem from '../components/modals/ModalHistoryItem';
import HistorySearch from '../components/history/HistorySearch';
import HistoryFilter from '../components/history/HistoryFilter';

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function scrollToLeft() {
  console.log('scroll!');
  const bins = document.querySelectorAll('[id^="history-bin-"]');

  console.log(bins);
  bins.forEach((el) => {
    el.scrollLeft = 0;
  });
}
function History(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // 클릭하면 열리는 모달 혹은 페이지가 필요할 경우 사용
  const handleClick = () => {
    // e.stopPropagation();
    // e.preventDefault();
    console.log('modal!');
    console.log(isOpen);
    setIsOpen(!isOpen);
  };

  const handleReloadClick = () => {
    navigate(0);
  };
  useEffect(() => {
    scrollToLeft();
    console.log('changed!');
  }, [isOpen]);

  return (
    <>
      <HistoryBox>
        <HistoryHeader>
          <ReloadBox onClick={handleReloadClick}>
            <ReloadBtn />
          </ReloadBox>
          {/* <DeleteButton>Reload</DeleteButton> */}
          <HistorySearch />
          <FilterBox>
            <HistoryFilter />
          </FilterBox>
          <DeleteButton>Clear History</DeleteButton>
        </HistoryHeader>
        <HistoryBody>
          <HistoryData handleClick={handleClick} />
        </HistoryBody>
      </HistoryBox>
      {isOpen && <ModalHistoryItem visible={isOpen} setVisible={setIsOpen} />}
    </>
  );
}

export default History;
