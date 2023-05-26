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
//import redux
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  selectConversation,
  setConversation,
  initializeConversation,
  selectCId,
} from '../features/main/conversationSlice';
//import api
import { getConversation } from '../api/ChatInterfaceApi';
import { Link } from 'react-router-dom';
import { selectLoginState } from '../features/member/loginInfoSlice';

//import data
import { Conversation } from '../data/d';

type MainProps = {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isMax?: boolean;
  newCId?: number;
};

type BoxProps = {
  isOpen?: boolean;
};

//to fix current width, would have to measure the box width!
const MainBox = styled(M.MainBox)<BoxProps>`
  max-width: ${(props) =>
    props.isOpen
      ? 'var(--size-minwidth-pc-main)'
      : 'var(--size-minwidth-pc-main)'}; //change this when you adjust the max-width;
`;

function scrollToLastQ() {
  const lastQnA = document.getElementById('qnaList')?.lastChild as HTMLElement;
  if (lastQnA) lastQnA.scrollIntoView({ behavior: 'smooth' });
}

const StartBox = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: 20px;
  color: var(--color-default-yellow);
  font-weight: 500;
  // text-transform: uppercase;
  div:hover {
    color: var(--color-default-yellow-darker);
  }
`;

const Main = ({ isOpen, setIsOpen, isMax, newCId }: MainProps) => {
  const dispatch = useAppDispatch();

  const conversation: Conversation = useAppSelector(selectConversation);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [qNum, setQNum] = useState<number>(0);
  const [currentCId, setCurrentCId] = useState<number>(
    useAppSelector(selectCId),
  );

  const [editTitleState, setEditTitleState] = useState<boolean>(false);
  const [editConfirm, setEditConfirm] = useState<boolean>(false);
  const loggedIn = useAppSelector(selectLoginState);

  const updateQNum = () => {
    // console.log('updating question number!');
    setQNum((prev) => prev + 1);
  };

  const loadConv = async (cId: number) => {
    if (cId !== -1) {
      const conversation = await getConversation(cId);
      if (conversation) {
        // console.log('started new session!');
        console.log(conversation);
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
      //     // console.log(conversations.bookmarkList);
      //   }
      // })();
      //edit bookmark test
      (async function () {
        // await loadConv(3);
        // const res = await editBookmark({
        //   bId: 33,
        //   newName: 'WorldHist',
        // });
        // console.log(res);
      })();
    }

    // (async function () {
    //   const conversations = await getCollections();
    //   if (conversations) {
    //     // console.log('fetched data!');
    //     console.log(conversations);
    //   }
    // })();
  }, []);

  // useEffect(() => {
  //   loadConv(currentCId);
  // }, [conversation.conversationId]);

  useEffect(() => {
    scrollToLastQ();
  }, [conversation.title, conversation.qnaList.length]);

  useEffect(() => {}, [isLoading]);

  useEffect(() => {
    // console.log('store conversation UPDATED');
  }, [conversation, selectLoginState]);

  useEffect(() => {
    if (conversation.title) {
      (async function () {
        const newConversation = await getConversation(
          conversation?.conversationId,
        );
        if (newConversation) {
          dispatch(setConversation(newConversation));
          setCurrentCId(newConversation.conversationId);
        }
      })();
    }
  }, [qNum]);

  return (
    <MainBox isOpen={isOpen}>
      <M.MainBackdrop isMax={isMax} />
      <M.FixedTopBox isMax={isMax}>
        <ChatInput
          setIsLoading={setIsLoading}
          updateQNum={updateQNum}
          isMax={isMax}
          setIsOpen={setIsOpen}
        />

        {!conversation.title && (
          <StartBox>
            <Link to="/serviceIntro">
              <div> Click here for an intro to Chatcrawl!</div>
            </Link>
            {!loggedIn && (
              <>
                <br /> <br />
                <br />
                로그인을 해야만 모든 서비스 이용 가능합니다.
                <br />
                <br />
                테스트계정: test@test.com, Test123!
                <br /> <br />
                <br />{' '}
              </>
            )}
          </StartBox>
        )}
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
      {Boolean(conversation.conversationId) ? (
        <QnAList isLoading={isLoading} qnaItems={conversation?.qnaList} />
      ) : (
        isLoading && (
          <M.LoadingBox>
            <Loading />
          </M.LoadingBox>
        )
      )}
    </MainBox>
  );
};

export default Main;
