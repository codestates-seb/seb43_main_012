import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Conversation } from '../../data/d';
import axios from 'axios';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-height: 80%;
  overflow-y: auto;
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  z-index: 100;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
`;

const Description = styled.p`
  margin-bottom: 1rem;
`;

const QnaListWrapper = styled.div`
  margin-top: 2rem;
`;

const QnaButton = styled.button`
  display: block;
  margin-bottom: 1rem;
  border: solid;
  border-color: #c9ad6e;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

type ModalContentProps = {
  conversation: Conversation;
  onClose: () => void;
};

const BookmarkButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const BookmarkButton = styled.button`
  margin: 1rem;
  padding: 0.5rem 1rem;
  color: white;
  background-color: #c9ad6e;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

const ModalContent: React.FC<ModalContentProps> = ({
  conversation,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>(conversation);

  useEffect(() => {
    axios
      .get(
        `http://ec2-3-35-18-213.ap-northeast-2.compute.amazonaws.com:8080/conversations/${conversation.conversationId}`,
      )
      .then((response) => {
        setSelectedConversation(response.data);
      });
  }, [conversation.conversationId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target === document.querySelector('.modal-overlay')) {
        setIsOpen(false);
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div>
      {isOpen && (
        <ModalOverlay className="modal-overlay">
          <ModalWrapper>
            <ModalCloseButton
              onClick={() => {
                setIsOpen(false);
                onClose();
              }}
            >
              &times;
            </ModalCloseButton>
            <ContentWrapper>
              <QnaListWrapper>
                {selectedConversation.qnaList.map((qna) => (
                  <div key={qna.qnaId}>
                    <QnaButton
                      onClick={() => {
                        const answerDiv = document.getElementById(
                          `answer-${qna.qnaId}`,
                        );
                        answerDiv.style.display =
                          answerDiv.style.display === 'none' ? 'block' : 'none';
                      }}
                    >
                      {qna.question}
                    </QnaButton>
                    <div id={`answer-${qna.qnaId}`} style={{ display: 'none' }}>
                      <p>{qna.answer}</p>
                      <br></br>
                    </div>
                  </div>
                ))}
                <BookmarkButtonWrapper>
                  {selectedConversation.bookmarks.map((bookmark) => (
                    <BookmarkButton key={bookmark.bookmarkId}>
                      {bookmark.bookmarkName}
                    </BookmarkButton>
                  ))}
                </BookmarkButtonWrapper>
                <BookmarkButton>+ Bookmark</BookmarkButton>
              </QnaListWrapper>
            </ContentWrapper>
          </ModalWrapper>
        </ModalOverlay>
      )}
    </div>
  );
};

export default ModalContent;
