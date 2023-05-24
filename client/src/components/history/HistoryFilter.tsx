import React from 'react';
import {
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
} from '@coreui/react';

type Props = {
  queries: string;
  setQueries: (newValue: string) => void;
};

const HistoryFilter = ({ queries, setQueries }: Props) => {
  const Dict = {
    Newest: `sort=desc`,
    Oldest: `sort=asc`,
    'Most Active': `sort=activityLevel`,
  };
  const handleClick = (e: any) => {
    // e.preventDefault();
    e.stopPropagation();
    if (e?.target?.textContent === 'Newest') {
      console.log('new');
      if (queries !== Dict.Newest) setQueries(Dict.Newest);
      return;
    }
    if (e?.target?.textContent === 'Oldest') {
      console.log('old');
      if (queries !== Dict.Oldest) setQueries(Dict.Oldest);
      return;
    }
    if (e?.target?.textContent === 'Most Active') {
      if (queries !== Dict['Most Active']) setQueries(Dict['Most Active']);
      return;
    }
  };
  return (
    <CDropdown>
      <CDropdownToggle href="#" color="secondary">
        Sort
      </CDropdownToggle>
      <CDropdownMenu className="dropdown_history">
        <CDropdownItem href="#" onClick={handleClick}>
          Newest
        </CDropdownItem>
        <CDropdownItem href="#" onClick={handleClick}>
          Oldest
        </CDropdownItem>
        <CDropdownItem href="#" onClick={handleClick}>
          Most Active
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default HistoryFilter;
