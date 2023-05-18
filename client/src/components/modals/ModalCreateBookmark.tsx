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

type ButtonProps = {
  inputExists: boolean;
};
const PrimaryBtn = styled.button<ButtonProps>`
  border: none;
  border-radius: 20px;
  padding: 10px;
  font-size: 15px;
  background-color: rgba(119, 173, 105, 0.6);
  color: white;

  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.inputExists
        ? 'var(--color-default-green)'
        : 'rgba(119, 173, 105, 0.6)'};
  }
`;

const SecondaryBtn = styled(PrimaryBtn)`
  background-color: var(--b45);

  &: hover {
    background-color: var(--b50);
  }
`;

const InputBookmarkBox = styled(InputTitleBox)`
  justify-content: center;
  border: none;
  text-align: center;

  input {
    border: none;
    border-bottom: 1px solid var(--color-default-border);
    font-size: var(--text-fontsize-qinput);
    font-weight: var(--text-fontweight-regular);
    width: 80%;
    text-align: center;
  }
`;

const ErrorMsg = styled.div`
  color: var(--color-error);
  padding-top: 10px;
`;

type Props = {
  visible: boolean;
  setVisible: (isOpen: boolean) => void;
};

const ModalCreateBookmark = ({ visible, setVisible }: Props) => {
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
      console.log('created bookmark!');
      setVisible(false);
      setValue('');
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
        {InputBookmarkName}{' '}
        {showError && <ErrorMsg>내용을 입력하여 주십시오</ErrorMsg>}
      </CModalBody>

      <CModalFooter>
        <SecondaryBtn onClick={() => setVisible(false)}>Cancel</SecondaryBtn>
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
