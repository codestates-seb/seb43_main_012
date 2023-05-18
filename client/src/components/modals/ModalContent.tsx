import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Conversation } from '../../data/dataTypes';

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

type ModalContentProps = {
  conversation: Conversation;
  onClose: () => void;
};

const ModalContent: React.FC<ModalContentProps> = ({
  conversation,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

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
    <>
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
              <Title>{conversation.title}</Title>
              <Description>{conversation.answerSummary}</Description>
            </ContentWrapper>
          </ModalWrapper>
        </ModalOverlay>
      )}
    </>
  );
};

export default ModalContent;
