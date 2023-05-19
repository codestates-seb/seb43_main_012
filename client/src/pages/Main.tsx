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

//import data
import { Conversation, initialConvData } from '../data/dataTypes';

//import api
import {
  getConversation,
  saveBookmark,
  getAllConversations,
} from '../api/ChatInterfaceApi';

// const TempBackdrop = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   z-index: 1;
// `;

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
  //set initial State of conversation; -> store
  const [conversation, setConversation] =
    useState<Conversation>(initialConvData);
  const [editTitleState, setEditTitleState] = useState<boolean>(false);
  const [editConfirm, setEditConfirm] = useState<boolean>(false);
  const [qNum, setQNum] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateQNum = () => {
    console.log('updating question number!');
    setQNum((prev) => prev + 1);
  };
  const handleCheckQnAToSave = ({
    id,
    newCheckValue,
  }: {
    id: number;
    newCheckValue: boolean;
  }) => {
    //turn that id's bookmarkStatus to false
    const QnAToChange = conversation?.qnaList.find((qna) => qna.qnaId === id);

    if (QnAToChange) {
      const updatedQnA = { ...QnAToChange, bookmarkStatus: newCheckValue };
      const updatedQnAList = [
        updatedQnA,
        ...(conversation?.qnaList || []).filter((qna) => qna.qnaId !== id),
      ].sort((a, b) => a.qnaId - b.qnaId);

      // console.log('to save: ', updatedQnAList);
      if (conversation)
        setConversation((prev) => ({ ...prev!, qnaList: updatedQnAList }));
    }
  };

  useEffect(() => {
    // (async function () {
    //   const conversation = await getConversation(5);
    //   if (conversation) {
    //     console.log('started new session!');
    //     console.log('response: ', conversation);
    //     setConversation(conversation);
    //   }
    // })();
    (async function () {
      const conversations = await getAllConversations();
      if (conversations) {
        console.log('fetched data!');
        console.log(conversations);
        // setConversation(conversation);
      }
    })();
    // saveBookmark({ cId: 3, bName: '기본폴더2' });
    // getAllConversations();
    // askFirstQuestion();
    // editTitle({ id: 11, title: '405 HTTP Response Code Error' });
    // askFirstQuestionOpenAI();
    // deleteConv();
    // getConversation(11);
    // continueConversation(10, 'how long has it took openai to launch you?');
    // console.log(conversation);
  }, []);

  useEffect(() => {
    scrollToLastQ();
  }, [conversation.title, conversation.qnaList.length]);

  useEffect(() => {
    console.log('loading status changed');
  }, [isLoading]);

  useEffect(() => {
    if (conversation.title) {
      (async function () {
        const newConversation = await getConversation(
          conversation?.conversationId,
        );
        if (newConversation) {
          console.log('continuing new session!');
          setConversation(newConversation);
        }
      })();
    }
    // (async function () {
    //   const conversation = await getConversation(9);
    //   if (conversation) {
    //     console.log('fetched conversation data!');
    //     setConversation(conversation);
    //   }
    // })();
    // if (conversation) scrollToLastQ(); //do it when it's only asking more...
  }, [qNum]);

  return (
    <MainBox isOpen={isOpen}>
      <M.MainBackdrop />
      <M.FixedTopBox>
        <ChatInput
          cValue={conversation}
          setCValue={setConversation}
          setIsLoading={setIsLoading}
          updateQNum={updateQNum}
        />
        {Boolean(conversation.title) && (
          <M.TitleBox>
            <EditableTitle
              cValue={conversation}
              setCValue={setConversation}
              editState={editTitleState}
              setEditState={setEditTitleState}
              editConfirm={editConfirm}
            />
            <EditSaveUI
              cId={conversation.conversationId}
              saved={conversation.saved}
              bookmarks={conversation.bookmarks}
              editState={editTitleState}
              setEditState={setEditTitleState}
              setEditConfirm={setEditConfirm}
            />
          </M.TitleBox>
        )}
      </M.FixedTopBox>
      {conversation.title ? (
        <QnAList
          isLoading={isLoading}
          qnaItems={conversation?.qnaList}
          handleCheck={handleCheckQnAToSave}
        />
      ) : (
        <M.LoadingBox>
          <Loading loadingGif={loadingGif} />
        </M.LoadingBox>
      )}
    </MainBox>
  );
};

export default Main;
