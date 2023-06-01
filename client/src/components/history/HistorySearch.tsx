import React, { useState } from 'react';
import styled from 'styled-components';
import { InputQBox, InputSubmitBtn } from '../../styles/InputStyle';

import { ReactComponent as SearchIcon } from '../../assets/icons/history/iconSearch.svg';

import Input from '../chatinterface/Input';
import { useInput } from '../../utils/hooks/useInput';

const SearchBox = styled(InputQBox)<ButtonProps>`
  width: 70vw;
  input {
    width: 100%;
    box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.1);
  }

  button svg {
    fill: black;
  }
`;

type ButtonProps = {
  isInput: boolean;
};

type Props = {
  handleSearch: (value: string) => void;
  handleReload: () => void;
};

const HistorySearch = ({ handleSearch, handleReload }: Props) => {
  const [value, setValue] = useState('');

  const handleInput = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>,
  ) => {
    console.log('search input!');
    e.preventDefault();
    e.stopPropagation();
    if (!value) {
      handleReload();
      return;
    }
    handleSearch(value);
  };

  const searchInputProps = useInput({
    inputType: 'text',
    value,
    setValue,
    placeholder: 'Search questions, answers, tags... (add # for tags)',
    handleInput,
    id: 'historySearchInput',
  });

  const searchInput = Input({
    StyledComponent: SearchBox,
    inputProps: searchInputProps,
    inputExists: Boolean(value),
    handleInput,
    SVGStyledComponent: InputSubmitBtn,
    SubmitSVGButton: SearchIcon,
  });

  return <div>{searchInput}</div>;
};

export default HistorySearch;
