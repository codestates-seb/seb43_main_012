import React, { useState, useEffect } from 'react';
//import components
import ChatInput from '../components/chatinterface/ChatInput';
import EditableTitle from '../components/chatinterface/EditableTitle';
import EditSaveUI from '../components/chatinterface/EditSaveUI';
import QnAList from '../components/chatinterface/QnAList';
import bgImg from '../assets/temp/screenshot_mainpage.png';
import Loading from '../components/chatinterface/Loading';
//import style
import styled from 'styled-components';
import * as M from '../styles/MainStyle';
//import file
import loadingGif from '../assets/gifs/dot-anim1_sm.gif';

//import axios
import { axiosDefault, axiosNgrok } from '../utils/axiosConfig';
import {
  Post,
  GetPostResponse,
  QnAType,
  GetNewQnAResponse,
  openAIAnswer,
  GetOpenAIResponse,
  Conversation,
  initialConvData,
} from '../data/dataTypes';

const TempBackdrop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  z-index: 1;
`;

type MainProps = {
  isOpen: boolean;
};

//to fix current width, would have to measure the box width!
const MainBox = styled(M.MainBox)<MainProps>`
  max-width: ${(props) =>
    props.isOpen
      ? 'var(--size-minwidth-pc-main)'
      : 'var(--size-minwidth-pc-main)'}; //change this when you adjust the max-width;
`;

async function getJSON() {
  const post = await axiosDefault
    .post<GetOpenAIResponse>(
      'http://ec2-3-35-18-213.ap-northeast-2.compute.amazonaws.com:8080/openai/question',
      {
        conversationId: 20,
        question: 'What is your favorite food?',
      },
    )
    .then((res) => {
      console.log(res);
      // res.data;
      console.log(res.data);
    })
    .catch((err) => console.log(err));
}

function scrollToLastQ() {
  const lastQnA = document.getElementById('qnaList')?.lastChild as HTMLElement;
  lastQnA.scrollIntoView({ behavior: 'smooth' });
}

const Main = ({ isOpen }: MainProps) => {
  //set initial State of conversation; -> store
  const [conversation, setConversation] = useState(initialConvData);
  const [editTitleState, setEditTitleState] = useState<boolean>(false);
  const [editConfirm, setEditConfirm] = useState<boolean>(true);

  const handleCheckQnAToSave = ({
    qnaId,
    isChecked,
  }: {
    qnaId: number;
    isChecked: boolean;
  }) => {
    //turn that qnaId's bookmarkStatus to false
    const QnAToNotSave = conversation.qnaList.find(
      (qna) => qna.qnaId === qnaId,
    );

    if (QnAToNotSave) {
      const updatedQnA = { ...QnAToNotSave, bookmarkStatus: false };
      const updatedQnAList = [
        updatedQnA,
        ...conversation.qnaList.filter((qna) => qna.qnaId !== qnaId),
      ].sort((a, b) => a.qnaId - b.qnaId);

      console.log('to save: ', updatedQnAList);

      setConversation({
        ...conversation,
        qnaList: updatedQnAList,
      });
    }
  };
  // const [conv, setConv] = useState<openAIAnswer>({
  //   conversationId: 1,
  //   title: "",
  //   bookmarks: [],
  //   tags: [],
  //   qnaList: [
  //     {
  //       qnaId: 1,
  //       question: "",
  //       answer: "",
  //       bookmarkStatus: false,
  //       displayStatus: true,
  //     },
  //   ],
  // });
  // const [post, setPost] = useState<Post>({
  //   id: 1,
  //   title: "",
  //   content: "",
  //   createdAt: "",
  //   updatedAt: "",
  //   UserId: 1,
  // });

  useEffect(() => {
    // getJSON();
    // (async () => {
    //   const post = await getJSON(): Promise<Post>
    // })();
    console.log(conversation);
    if (conversation.title) scrollToLastQ(); //do it when it's only asking more...
  }, [conversation]);

  return (
    <MainBox isOpen={isOpen}>
      <M.MainBackdrop />
      <M.FixedTopBox>
        <ChatInput cValue={conversation} setCValue={setConversation} />
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
              editState={editTitleState}
              setEditState={setEditTitleState}
              setEditConfirm={setEditConfirm}
            />
          </M.TitleBox>
        )}
      </M.FixedTopBox>
      {conversation.title ? (
        <QnAList
          qnaItems={conversation.qnaList}
          handleCheck={handleCheckQnAToSave}
        />
      ) : (
        <M.LoadingBox>
          <Loading loadingGif={loadingGif} />
        </M.LoadingBox>
      )}

      {/* <TempBackdrop>
        <img
          src={bgImg}
          style={{
            width: 1000,
            height: 692,
            zIndex: -1,
            opacity: 0.2,
            // objectFit: "cover",
            position: 'absolute',
            top: 0,
          }}
        />
      </TempBackdrop> */}
    </MainBox>
  );
};

export default Main;
