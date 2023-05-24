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

import { useAppSelector } from '../app/hooks';
import { selectConversation } from '../features/main/conversationSlice';
import { ConversationThumbType } from '../data/d';
import { DateFilter, filterConvsByDate } from '../utils/DateFiltering';
import {
  getAllConversations,
  getTaggedConversations,
} from '../api/ChatInterfaceApi';

function scrollToLeft() {
  console.log('scroll!');
  const bins = document.querySelectorAll('[id^="history-bin-"]');

  console.log(bins);
  bins.forEach((el) => {
    el.scrollLeft = 0;
  });
}

export type BinnedConvType = {
  [key in DateFilter]: ConversationThumbType[];
};

function History(): ReactElement {
  const [binnedConv, setBinnedConv] = useState<BinnedConvType>({});

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const conv = useAppSelector(selectConversation);

  // 클릭하면 열리는 모달 혹은 페이지가 필요할 경우 사용
  const handleClick = () => {
    // e.stopPropagation();
    // e.preventDefault();
    console.log('modal!');
    console.log(isOpen);
    setIsOpen(!isOpen);
  };

  const handleReloadClick = () => {
    loadAllConv();
  };

  useEffect(() => {
    scrollToLeft();
    console.log('changed!');
  }, [isOpen]);

  useEffect(() => {
    loadAllConv();
  }, []);

  const loadAllConv = async () => {
    try {
      const conversations: ConversationThumbType[] =
        await getAllConversations();
      // console.log(filterConvsByDate(conversations));
      conversations.sort((a, b) => (b.pinned ? 1 : a.pinned ? -1 : 0));
      setBinnedConv(filterConvsByDate(conversations));
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const TagSearch = async (tagId: number | string) => {
    try {
      const res = await getTaggedConversations(tagId);
      if (res) {
        console.log('loading tagged results!');
        res.sort((a: ConversationThumbType, b: ConversationThumbType) =>
          b.pinned ? 1 : a.pinned ? -1 : 0,
        );
        setBinnedConv(filterConvsByDate(res));
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  useEffect(() => {
    console.log('update history data');
    loadAllConv();
  }, [conv]);

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
          <HistoryData
            handleClick={handleClick}
            binnedConv={binnedConv}
            TagSearch={TagSearch}
          />
        </HistoryBody>
      </HistoryBox>
      {isOpen && <ModalHistoryItem visible={isOpen} setVisible={setIsOpen} />}
    </>
  );
}

export default History;
