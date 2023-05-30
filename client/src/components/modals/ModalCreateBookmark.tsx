import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import {
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
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  createBookmarkAsync,
  updateBookmarks,
  initializeConversation,
  selectCId,
} from '../../features/main/conversationSlice';
import {
  createEmptyBookmarkAsync,
  setCollectionBookmark,
} from '../../features/collection/collectionSlice';

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
  mode: 'addEmpty' | 'addConversation';
};

const ModalCreateBookmark = ({ visible, setVisible, mode }: Props) => {
  const [value, setValue] = useState<string>('');
  const currentCId = useAppSelector(selectCId);

  const dispatch = useAppDispatch();

  const handleCreateClick = async (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (value) {
      if (mode === 'addConversation') {
        const res = await dispatch(createBookmarkAsync({ bName: value }));
        if (res.payload) {
          const payload = res.payload as {
            bookmarkId: number;
            bookmarkName: string;
          };
          dispatch(updateBookmarks({ bId: payload.bookmarkId, bName: value }));
          alert('북마크가 성공적으로 생성되었습니다');
        }
      } else if (mode === 'addEmpty') {
        const res = await dispatch(createEmptyBookmarkAsync({ bName: value }));
        console.log('res: ', res);
        // if (res.payload) {
        //   const payload = res.payload as {
        //     bookmarkId: number;
        //     bookmarkName: string;
        //   };
        //   dispatch(setCollectionBookmark(payload.bookmarkName));
        dispatch(setCollectionBookmark(value));
        dispatch(initializeConversation(currentCId - 1));
        if (res.meta.requestStatus === 'fulfilled')
          alert('북마크가 성공적으로 생성되었습니다');
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
    <CModal
      className="modal_bookmark"
      alignment="center"
      visible={visible}
      onClose={() => {
        setVisible(false);
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <CModalHeader
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <CModalTitle>Create Collection</CModalTitle>
      </CModalHeader>
      <CModalBody
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
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
  );
};

export default ModalCreateBookmark;
