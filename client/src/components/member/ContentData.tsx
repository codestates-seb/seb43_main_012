import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { TagType } from '../../data/dataTypes';

const Main = styled.main`
  max-width: 1080px;
  padding: 0 40px 0 40px;
`;

const ContentWraper = styled.div`
  border: none;
  width: 100%;
   overflow-y: hidden;
`;

const ContentContainer = styled.div`
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 5px;
`;

const Content = styled.a`
  padding: 5px;
  border: solid;
  border-color: #c9ad6e;
  border-radius: 10px;
  margin: 0 1% 1% 0;

  p {
    max-height: 7rem;
    text-align: left;
    word-break: break-all;
  }

  .header {
    display: flex;
    justify-content: space-between;
  }

  .title {
    /* word-break: break-all; */
  }

  .tag {
    color: #7bb06e;
  }
`;

// 받아오는 데이터 타입 설정
export type Conversation = {
  conversationId: number;
  title: string;
  member: {
    memberId: string;
    avatarLink: string;
  };
  answerSummary: string;
  createdAt: string;
  modifiedAt: string;

  saved: boolean;
  pinned: boolean;
  published: boolean;
  tags: TagType[];
  viewCount: number;
  activityLevel: number;
};


const ContentData = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // 데이터 GET
  useEffect(() => {
    axios
      .get(
        'http://ec2-3-35-18-213.ap-northeast-2.compute.amazonaws.com:8080/collections/',
      )
      .then((response) => {
        const data = response.data;
        setConversations(data.conversations);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, []);

  // 제목과 태그만 빼놓음
  return (
    <Main>
      <ContentWraper>
        <ContentContainer>
          {conversations.map((conversation) => (
            <Content
              key={conversation.conversationId}
              href="#"
              onClick={() => {
                // Handle content click
              }}
            >
              <div className="header">
                <h3 className="title">{conversation.title}</h3>
              </div>
              <div className="tag">
                {conversation.tags.map((tag) => (
                  <span key={tag.tagId}>#{tag.tagName} </span>
                ))}
              </div>
            </Content>
          ))}
        </ContentContainer>
      </ContentWraper>
    </Main>
  );
};

export default ContentData;
