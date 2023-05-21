import React, { useState, useEffect } from 'react';
//import style
import styled from 'styled-components';
import * as M from '../styles/MainStyle';
//import components
import ChatInput from '../components/chatinterface/ChatInput';
import EditableTitle from '../components/chatinterface/EditableTitle';
import EditSaveUI from '../components/chatinterface/EditSaveUI';
import QnAList from '../components/chatinterface/QnAList';
import Loading from '../components/chatinterface/Loading';
//import files
import loadingGif from '../assets/gifs/dot-anim1_sm.gif';
//import redux
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  selectConversation,
  setConversation,
  initializeConversation,
  selectCId,
} from '../features/main/conversationSlice';
//import api
import {
  getConversation,
  getAllConversations,
  getSavedConversations,
  getCollections,
  editBookmark,
} from '../api/ChatInterfaceApi';

//import data
import { initialState } from '../features/main/conversationSlice';
import { Conversation, initialConvData } from '../data/d';

type MainProps = {
  isOpen: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

//to fix current width, would have to measure the box width!
const MainBox = styled(M.MainBox)<MainProps>`
  max-width: ${(props) =>
    props.isOpen
      ? 'var(--size-minwidth-pc-main)'
      : 'var(--size-minwidth-pc-main)'}; //change this when you adjust the max-width;
`;

function scrollToLastQ() {
  const lastQnA = document.getElementById('qnaList')?.lastChild as HTMLElement;
  if (lastQnA) lastQnA.scrollIntoView({ behavior: 'smooth' });
}

const Main = ({ isOpen, setIsOpen }: MainProps) => {
  const dispatch = useAppDispatch();

  const conversation = useAppSelector(selectConversation);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [qNum, setQNum] = useState<number>(0);
  const [currentCId, setCurrentCId] = useState<number>(
    useAppSelector(selectCId),
  );

  const [editTitleState, setEditTitleState] = useState<boolean>(false);
  const [editConfirm, setEditConfirm] = useState<boolean>(false);

  const updateQNum = () => {
    // console.log('updating question number!');
    setQNum((prev) => prev + 1);
  };

  const loadConv = async (cId: number) => {
    if (cId !== -1) {
      const conversation = await getConversation(cId);
      if (conversation) {
        // console.log('started new session!');
        // console.log(conversation);
        dispatch(setConversation(conversation));
      }
    } else {
      dispatch(initializeConversation(-1));
    }
    return;
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      // (async function () {
      //   const conversations = await getAllConversations();
      //   if (conversations) {
      //     // console.log('fetched data!');
      //     console.log(conversations);
      //   }
      // })();
      //edit bookmark test
      (async function () {
        // await loadConv(22);
        // const res = await editBookmark({
        //   bId: 33,
        //   newName: 'WorldHist',
        // });
        // console.log(res);
      })();
    }

    (async function () {
      const conversations = await getCollections();
      if (conversations) {
        // console.log('fetched data!');
        console.log(conversations);
      }
    })();
  }, []);

  // useEffect(() => {
  //   loadConv(currentCId);
  // }, [conversation.conversationId]);

  useEffect(() => {
    scrollToLastQ();
  }, [conversation.title, conversation.qnaList.length]);

  useEffect(() => {
    // console.log('loading status changed');
  }, [isLoading]);

  useEffect(() => {
    console.log('store conversation UPDATED');
  }, [conversation]);

  useEffect(() => {
    if (conversation.title) {
      (async function () {
        const newConversation = await getConversation(
          conversation?.conversationId,
        );
        if (newConversation) {
          // console.log('continuing new session!');
          dispatch(setConversation(newConversation));
          setCurrentCId(newConversation.conversationId);
        }
      })();
    }
  }, [qNum]);

  return (
    <MainBox isOpen={isOpen}>
      <M.MainBackdrop />
      <M.FixedTopBox>
        <ChatInput setIsLoading={setIsLoading} updateQNum={updateQNum} />
        {Boolean(conversation.title) && (
          <M.TitleBox>
            <EditableTitle
              editState={editTitleState}
              setEditState={setEditTitleState}
              editConfirm={editConfirm}
            />
            <EditSaveUI
              editState={editTitleState}
              setEditState={setEditTitleState}
              setEditConfirm={setEditConfirm}
            />
          </M.TitleBox>
        )}
      </M.FixedTopBox>
      {conversation.title ? (
        <QnAList isLoading={isLoading} qnaItems={conversation?.qnaList} />
      ) : (
        <M.LoadingBox>
          <Loading loadingGif={loadingGif} />
        </M.LoadingBox>
      )}
    </MainBox>
  );
};

export default Main;
