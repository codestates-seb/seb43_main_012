import React, { useState } from 'react';
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
} from '@coreui/react';
import Main from '../../pages/Main';

import { useAppDispatch } from '../../app/hooks';
import {
  initializeConversation,
  scrollToLast,
} from '../../features/main/conversationSlice';

type Props = {
  visible: boolean;
  setVisible: (isOpen: boolean) => void;
};
const ModalHistoryItem = ({ visible, setVisible }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <CModal
      id="modal-convItem"
      className="modal_bookmark modal_chatbox"
      alignment="top"
      visible={visible}
      onClose={() => {
        setVisible(false);
        dispatch(initializeConversation(-1));
      }}
    >
      <CModalBody className="modal_bookmark2">
        <Main isMax={true} />
      </CModalBody>
    </CModal>
  );
};

export default ModalHistoryItem;
