import React, { useState } from 'react';
import styled from 'styled-components';
import { InputQBox, InputSubmitBtn } from '../../styles/InputStyle';

import { ReactComponent as SearchIcon } from '../../assets/icons/history/iconSearch.svg';

import Input from '../chatinterface/Input';
import { useInput } from '../../utils/hooks/useInput';

const SearchBox = styled(InputQBox)`
  min-width: 50vw;
  input {
    box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.1);
  }
`;

const HistorySearch = () => {
  const [value, setValue] = useState('');

  const handleInput = () => {};

  const searchInputProps = useInput({
    inputType: 'text',
    value,
    setValue,
    placeholder: 'Search questions, answers, tags...',
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
