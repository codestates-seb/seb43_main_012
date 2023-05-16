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
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

//to fix current width, would have to measure the box width!
const MainBox = styled(M.MainBox)<MainProps>`
  max-width: ${(props) =>
    props.isOpen
      ? 'var(--size-minwidth-pc-main)'
      : 'var(--size-minwidth-pc-main)'}; //change this when you adjust the max-width;
`;

async function getAllConversations() {
  axiosDefault
    .get<any>(
      'http://ec2-3-35-18-213.ap-northeast-2.compute.amazonaws.com:8080/conversations',
    )
    .then((res) => {
      console.log(res);
      // res.data;
      console.log(res.data);
    })
    .catch((err) => console.log(err));
}

async function askFirstQuestion(question: string) {
  axiosDefault
    .post<any>(
      'http://ec2-3-35-18-213.ap-northeast-2.compute.amazonaws.com:8080/conversations',
      {
        question,
      },
    )
    .then((res) => {
      // console.log(res);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
}

async function askFirstQuestionOpenAI(question: string) {
  axiosDefault
    .post<any>(
      'http://ec2-3-35-18-213.ap-northeast-2.compute.amazonaws.com:8080/openai/question',
      {
        question,
      },
    )
    .then((res) => {
      // console.log(res);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
}

async function continueConversation(id: number, question: string) {
  axiosDefault
    .post<any>(
      `http://ec2-3-35-18-213.ap-northeast-2.compute.amazonaws.com:8080/openai/question`,
      {
        conversationId: 11,
        question,
      },
    )
    .then((res) => {
      // console.log(res);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
}

async function getConversation(id: number): Promise<Conversation> {
  try {
    const res = await axiosDefault.get<any>(
      `http://ec2-3-35-18-213.ap-northeast-2.compute.amazonaws.com:8080/conversations/${id}`,
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function editTitle({ id, title }: { id: number; title: string }) {
  axiosDefault
    .patch<any>(
      `http://ec2-3-35-18-213.ap-northeast-2.compute.amazonaws.com:8080/conversations/${id}`,
      {
        // title: '405 error code',
        pinned: true,
      },
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));
}

async function deleteConv() {
  axiosDefault
    .delete<any>(
      'http://ec2-3-35-18-213.ap-northeast-2.compute.amazonaws.com:8080/conversations/5',
    )
    .then((res) => {
      console.log(res);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
}

async function saveCheckedQnA() {}

async function deleteUncheckedQnA() {}

async function saveBookmark({
  cId,
  bookmarks,
}: {
  cId: number;
  bookmarks: string[];
}) {
  axiosDefault
    .post(
      `http://ec2-3-35-18-213.ap-northeast-2.compute.amazonaws.com:8080/conversations/${cId}/bookmarks`,
      {
        bookmarks,
      },
    )
    .then((res) => {
      // console.log(res);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
}

async function editBookmark({
  cId,
  bookmarks,
}: {
  cId: number;
  bookmarks: string[];
}) {
  console.log('edit bookmark');
}

function scrollToLastQ() {
  const lastQnA = document.getElementById('qnaList')?.lastChild as HTMLElement;
  if (lastQnA) lastQnA.scrollIntoView({ behavior: 'smooth' });
}

const Main = ({ isOpen, setIsOpen }: MainProps) => {
  //set initial State of conversation; -> store
  // const [jsoncheck, setJSONcheck] = useState()
  const [conversation, setConversation] =
    useState<Conversation>(initialConvData);
  const [editTitleState, setEditTitleState] = useState<boolean>(false);
  const [editConfirm, setEditConfirm] = useState<boolean>(true);
  const [qNum, setQNum] = useState<number>(0);

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
    (async function () {
      const conversation = await getConversation(11);
      if (conversation) {
        console.log('fetched data!');
        setConversation(conversation);
      }
    })();

    // saveBookmark({ cId: 11, bookmarks: ['network', 'http'] });

    // getAllConversations();
    // askFirstQuestion();
    // editTitle({ id: 11, title: '405 HTTP Response Code Error' });
    // askFirstQuestionOpenAI();
    // deleteConv();
    // getConversation(11);
    // continueConversation(10, 'how long has it took openai to launch you?');
    // (async () => {
    //   const post = await getJSON(): Promise<Post>
    // })();
    // console.log(conversation);
  }, []);

  useEffect(() => {
    if (conversation) scrollToLastQ(); //do it when it's only asking more...
  }, [qNum]);

  return (
    <MainBox isOpen={isOpen}>
      <M.MainBackdrop />
      <M.FixedTopBox>
        <ChatInput
          cValue={conversation}
          setCValue={setConversation}
          setQNum={setQNum}
        />
        {Boolean(conversation) && (
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
      {conversation ? (
        <QnAList
          qnaItems={conversation?.qnaList}
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
