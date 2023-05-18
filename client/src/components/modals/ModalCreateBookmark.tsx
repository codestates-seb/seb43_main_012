import React, { useState, Dispatch, SetStateAction } from 'react';
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
} from '@coreui/react';
import '../../styles/sass/custom_modal_createbookmark.scss';

type Props = {
  visible: boolean;
  setVisible: (isOpen: boolean) => void;
};

const ModalCreateBookmark = ({ visible, setVisible }: Props) => {
  return (
    <CModal
      className="modal_bookmark"
      alignment="center"
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <CModalHeader>
        <CModalTitle>Create Collection</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros.
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton color="primary">Save changes</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalCreateBookmark;
