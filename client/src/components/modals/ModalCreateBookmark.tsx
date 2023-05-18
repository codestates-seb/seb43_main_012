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
import '../../styles/sass/custom_modal_createbookmark.scss';
import { InputTitleBox } from '../../styles/MainStyle';
// import '../../styles/sass/custom_buttons.scss';

//import components
import { useInput } from '../../utils/hooks/useInput';
import Input from '../chatinterface/Input';

//import api
import { saveBookmark } from '../../api/ChatInterfaceApi';

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

const InputCount = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 5px;
  width: 80%;
  font-size: var(--text-fontsize-info);
  color: var(--color-offblack) !important;

  span {
    color: var(--color-default-gray) !important;
  }
`;

const ErrorMsg = styled.div`
  color: var(--color-error);
  padding-top: 10px;
`;

type Props = {
  cId: number;
  visible: boolean;
  setVisible: (isOpen: boolean) => void;
};

const ModalCreateBookmark = ({ cId, visible, setVisible }: Props) => {
  const [value, setValue] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);

  // useEffect(() => {
  //   console.log(value);
  //   // if (value) {
  //   //   setShowError(false);
  //   // }
  // }, [value]);

  useEffect(() => {
    if (!visible) setShowError(false);
  }, [visible]);

  const handleCreateClick = () => {
    if (value) {
      console.log('clicked!');
      (async function () {
        const res = await saveBookmark({ cId, bName: value });
        if (res) {
          console.log('created bookmark!');
          setVisible(false);
          setValue('');
        }
      });
    } else {
      setShowError(true);
    }
    //if value is not entered, you cannot create!

    //make async request
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
      onClose={() => setVisible(false)}
    >
      <CModalHeader>
        <CModalTitle>Create Collection</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {InputBookmarkName}
        <InputCount>
          {value.length} / <span>30</span>
        </InputCount>
        {/* {showError && <ErrorMsg>내용을 입력하여 주십시오</ErrorMsg>} */}
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
