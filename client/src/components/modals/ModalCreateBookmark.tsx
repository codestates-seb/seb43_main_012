import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
} from '@coreui/react';
import styled from 'styled-components';
import { InputTitleBox } from '../../styles/MainStyle';
import { InputCount } from '../../styles/InputStyle';

//import components
import { useInput } from '../../utils/hooks/useInput';
import Input from '../chatinterface/Input';

//import redux
import { useAppDispatch } from '../../app/hooks';
import {
  createBookmarkAsync,
  updateBookmarks,
} from '../../features/main/conversationSlice';

type ButtonProps = {
  inputExists: boolean;
};
const PrimaryBtn = styled.button<ButtonProps>`
  border: none;
  border-radius: 20px;
  padding: 10px;
  font-size: 15px;
  background-color: ${(props) =>
    props.inputExists
      ? 'var(--color-default-green)'
      : 'rgba(119, 173, 105, 0.6)'};
  color: white;

  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.inputExists
        ? 'var(--color-default-darkgreen)'
        : 'rgba(119, 173, 105, 0.6)'};
  }
`;

const SecondaryBtn = styled(PrimaryBtn)`
  background-color: var(--b40);

  &: hover {
    background-color: var(--b45);
  }
`;

const InputBookmarkBox = styled(InputTitleBox)`
  justify-content: center;
  border: none;
  text-align: center;
  width: 80%;

  input {
    border: none;
    border-bottom: 1px solid var(--color-default-border);
    font-size: var(--text-fontsize-qinput);
    font-weight: var(--text-fontweight-regular);
    text-align: center;
  }
`;

const ErrorMsg = styled.div`
  color: var(--color-error);
  padding-top: 10px;
`;

// const ModalWrap = styled.div`
//   display: flex;
//   max-width: 500px ! !important;
// `;

type Props = {
  visible: boolean;
  setVisible: (isOpen: boolean) => void;
};

const ModalCreateBookmark = ({ visible, setVisible }: Props) => {
  const [value, setValue] = useState<string>('');

  const dispatch = useAppDispatch();

  const handleCreateClick = async () => {
    if (value) {
      // console.log('create bookmark btn clicked!');
      const res = await dispatch(createBookmarkAsync({ bName: value }));
      if (res.payload) {
        // console.log('unique bookmark name');
        const payload = res.payload as {
          bookmarkId: number;
          bookmarkName: string;
        };
        dispatch(updateBookmarks({ bId: payload.bookmarkId, bName: value }));
      }
      setVisible(false);
      setValue('');
    }
  };
  const InputBookmarkNameProps = useInput({
    inputType: 'text',
    value,
    setValue,
    handleInput: handleCreateClick,
    id: 'bookmarkInput',
    maxlength: 30,
  });

  const InputBookmarkName = Input({
    StyledComponent: InputBookmarkBox,
    inputProps: InputBookmarkNameProps,
    inputExists: Boolean(value),
    handleInput: handleCreateClick,
  });

  return (
    // <ModalWrap>
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
        {InputBookmarkName}
        <InputCount>
          {value.length}/<span>30</span>
        </InputCount>
      </CModalBody>

      <CModalFooter>
        <SecondaryBtn
          onClick={() => setVisible(false)}
          inputExists={Boolean(value)}
        >
          Cancel
        </SecondaryBtn>
        <PrimaryBtn
          onClick={handleCreateClick}
          {...(Boolean(value) ? {} : { disabled: true })}
          inputExists={Boolean(value)}
        >
          Create
        </PrimaryBtn>
      </CModalFooter>
    </CModal>
    // </ModalWrap>
  );
};

export default ModalCreateBookmark;
