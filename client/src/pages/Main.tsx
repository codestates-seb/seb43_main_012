import React, { useState, useEffect } from 'react';
//import components
import ChatInput from '../components/chatinterface/ChatInput';
import EditableTitle from '../components/chatinterface/EditableTitle';
import EditSaveUI from '../components/chatinterface/EditSaveUI';
import QnAList from '../components/chatinterface/QnAList';
import bgImg from '../assets/temp/screenshot_mainpage.png';
//import style
import styled from 'styled-components';
import * as M from '../styles/MainStyle';
import { axiosDefault, axiosNgrok } from '../utils/axiosConfig';
import {
  Post,
  GetPostResponse,
  QnA,
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

const Main = () => {
  //set initial State of conversation; -> store
  const [conversation, setConversation] = useState(initialConvData);
  const [editTitleState, setEditTitleState] = useState<boolean>(false);
  const [editConfirm, setEditConfirm] = useState<boolean>(true);
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
  }, []);

  return (
    <M.MainBox>
      {/* <div>Main Chat Interface</div> */}
      <ChatInput />
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

      <TempBackdrop>
        <img
          src={bgImg}
          style={{
            width: 1000,
            height: 692,
            zIndex: -1,
            opacity: 0.1,
            // objectFit: "cover",
            position: 'absolute',
            top: 90,
          }}
        />
      </TempBackdrop>
    </M.MainBox>
  );
};

export default Main;
