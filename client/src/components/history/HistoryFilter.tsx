import React from 'react';
import {
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
} from '@coreui/react';

const HistoryFilter = () => {
  return (
    <CDropdown>
      <CDropdownToggle href="#" color="secondary">
        Sort
      </CDropdownToggle>
      <CDropdownMenu className="dropdown_history">
        <CDropdownItem href="#">Newest</CDropdownItem>
        <CDropdownItem href="#">Oldest</CDropdownItem>
        <CDropdownItem href="#">Most Active</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default HistoryFilter;
