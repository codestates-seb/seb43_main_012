import React from 'react';
import { IconItems, IconItem } from '../../styles/IconStyle';
// @ts-ignore
import { ReactComponent as ConfirmIcon } from '../../assets/icons/main_qna/iconCheck.svg';
// @ts-ignore
import { ReactComponent as CancelIcon } from '../../assets/icons/main_qna/iconCancel.svg';
import { MyGenericFunctionType } from '../../data/d';

type Props = {
  handleConfirm: MyGenericFunctionType<any>;
  handleCancel: MyGenericFunctionType<any>;
};
const CheckCancelUI = ({ handleConfirm, handleCancel }: Props) => {
  return (
    <>
      <IconItem>
        <ConfirmIcon onClick={handleConfirm} />
      </IconItem>
      <IconItem>
        <CancelIcon onClick={handleCancel} />
      </IconItem>
    </>
  );
};
export default CheckCancelUI;
