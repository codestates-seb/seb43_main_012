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
import { initializeConversation } from '../../features/main/conversationSlice';

type Props = {
  visible: boolean;
  setVisible: (isOpen: boolean) => void;
};
const ModalHistoryItem = ({ visible, setVisible }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <CModal
      className="modal_bookmark modal_chatbox"
      alignment="center"
      visible={visible}
      onClose={() => {
        setVisible(false);
        dispatch(initializeConversation(-1));
      }}
    >
      <CModalBody className="modal_bookmark2">
        <Main isMax={true} />
      </CModalBody>
      {/* <CModalBody>Modal Stuff</CModalBody> */}
    </CModal>
  );
};

export default ModalHistoryItem;
