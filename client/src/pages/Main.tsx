import React, { useState, useEffect } from "react";
import ChatInput from "../components/chatinterface/ChatInput";
import bgImg from "../assets/temp/screenshot_mainpage.png";
import styled from "styled-components";
import { axiosDefault, axiosNgrok } from "../utils/axiosConfig";
import {
  Post,
  GetPostResponse,
  QnA,
  GetNewQnAResponse,
  openAIAnswer,
  GetOpenAIResponse,
} from "../data/dataTypes";

const TempBackdrop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

async function getJSON() {
  const post = await axiosDefault
    .post<GetOpenAIResponse>(
      "http://ec2-3-35-18-213.ap-northeast-2.compute.amazonaws.com:8080/openai/question",
      {
        conversationId: 20,
        question: "What is your favorite food?",
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
  });

  return (
    <>
      {/* <div>Main Chat Interface</div> */}
      <ChatInput />
      <TempBackdrop>
        <img
          src={bgImg}
          style={{
            width: 1000,
            height: 692,
            zIndex: -1,
            opacity: 0.3,
            // objectFit: "cover",
            position: "absolute",
            top: 90,
          }}
        />
      </TempBackdrop>
    </>
  );
};

export default Main;
