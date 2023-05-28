import { ReactElement, useState, useEffect } from 'react';
import {
  HistoryBox,
  HistoryHeader,
  FilterBox,
  DeleteButton,
  HistoryBody,
  ReloadBox,
  NoResultsBox,
} from '../styles/HistoryStyle';
import { ReactComponent as ReloadBtn } from '../assets/icons/history/iconReload.svg';

import HistoryData from '../components/history/HistoryData';
import ModalHistoryItem from '../components/modals/ModalHistoryItem';
import HistorySearch from '../components/history/HistorySearch';
import HistoryFilter from '../components/history/HistoryFilter';

import { useAppSelector } from '../app/hooks';
import { selectConversation } from '../features/main/conversationSlice';
import { ConversationThumbType } from '../data/d';
import { DateFilter, filterConvsByDate } from '../utils/DateFiltering';
import {
  getAllConversations,
  getTaggedConversations,
  getSearchResults,
} from '../api/ChatInterfaceApi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { initializeMemberState } from '../features/member/loginInfoSlice';
import { toggleModal } from '../features/collection/collectionSlice';

export type BinnedConvType = {
  [key in DateFilter]: ConversationThumbType[];
};

function scrollToLeft() {
  const bins = document.querySelectorAll('[id^="history-bin-"]');
  bins.forEach((el) => {
    el.scrollLeft = 0;
  });
}

function checkNewOld(queries: string) {
  if (queries === `sort=asc`) return 'old';
  return 'new';
}

function getTagname(input: string): string {
  // return input.split(' ')[0].slice(1);
  return input.slice(1);
}

function History(): ReactElement {
  const [binnedConv, setBinnedConv] = useState<BinnedConvType>({});
  const [queries, setQueries] = useState<string>('sort=desc');
  const [isOpen, setIsOpen] = useState(false);
  const [isNone, setIsNone] = useState(false);
  const conv = useAppSelector(selectConversation);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    // e.stopPropagation();
    // e.preventDefault();
    console.log('history modal open');
    setIsOpen(!isOpen);
  };

  const handleTextSearch = async (value: string) => {
    //tag search
    if (value[0] === '#') {
      TagSearch(getTagname(value));
      return;
    }

    const newValue = `${value}&${queries}`;
    (async function () {
      try {
        const conversations = await getSearchResults(newValue);
        if (!conversations.length) {
          setIsNone(true);
          return;
        }
        conversations.sort((a, b) => (b.pinned ? 1 : a.pinned ? -1 : 0));
        const type = checkNewOld(queries);
        setBinnedConv(filterConvsByDate(conversations, type));
        setIsNone(false);
      } catch (err) {
        throw err;
      }
    })();
  };

  const handleReloadClick = () => {
    loadAllConv();
  };

  useEffect(() => {
    scrollToLeft();
  }, [isOpen]);

  useEffect(() => {
    loadAllConv();
  }, []);

  useEffect(() => {
    loadAllConv();
  }, [conv, queries]);

  const loadAllConv = async (q: string = queries) => {
    try {
      setIsNone(false);
      // console.log('load all conv');
      const conversations: ConversationThumbType[] = await getAllConversations(
        queries,
      );
      conversations.sort((a, b) => (b.pinned ? 1 : a.pinned ? -1 : 0));
      const type = checkNewOld(queries);
      setBinnedConv(filterConvsByDate(conversations, type));
    } catch (err) {
      localStorage.clear();
      dispatch(initializeMemberState);
      navigate('/');
      throw err;
    }
  };

  const TagSearch = async (tagId: number | string) => {
    try {
      const res = await getTaggedConversations(tagId);
      if (res) {
        if (!res.length) {
          setIsNone(true);
          return;
        }
        // console.log('loading tagged results!');
        res.sort((a: ConversationThumbType, b: ConversationThumbType) =>
          b.pinned ? 1 : a.pinned ? -1 : 0,
        );
        if (isNone) setIsNone(false);
        setBinnedConv(filterConvsByDate(res, 'new'));
      }
    } catch (err) {
      setIsNone(true);
      console.log(err);
      throw err;
    }
  };

  return (
    <>
      <HistoryBox>
        <HistoryHeader>
          <ReloadBox onClick={handleReloadClick}>
            <ReloadBtn />
          </ReloadBox>
          <HistorySearch
            handleSearch={handleTextSearch}
            handleReload={handleReloadClick}
          />
          <FilterBox>
            <HistoryFilter queries={queries} setQueries={setQueries} />
          </FilterBox>
          <DeleteButton>Clear History</DeleteButton>
        </HistoryHeader>
        {
          <HistoryBody>
            {!isNone ? (
              <HistoryData
                handleClick={handleClick}
                binnedConv={binnedConv}
                TagSearch={TagSearch}
              />
            ) : (
              <NoResultsBox>검색 결과가 없습니다.</NoResultsBox>
            )}
          </HistoryBody>
        }
      </HistoryBox>
      {isOpen && <ModalHistoryItem visible={isOpen} setVisible={setIsOpen} />}
    </>
  );
}

export default History;
