import React, {
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  MouseEvent,
  useEffect,
} from 'react';
import styled from 'styled-components';

type CheckboxProps = {
  id?: number;
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
  isHovered: boolean;
  setIsHovered?: Dispatch<SetStateAction<boolean>>;
  handleCheck: (...params: any[]) => void; //how to set any params
};

type StyleProps = {
  isHovered: boolean;
};

const Round = styled.div<StyleProps>`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  // margin-right: 10px;

  label {
    background-color: #fff;
    border: 1px solid #ccc;
    border: 1px solid ${(p) => (p.isHovered ? '#000' : '#ccc')};
    border-radius: 50%;
    cursor: pointer;
    height: 25px;
    left: 0;
    position: absolute;
    top: 0;
    width: 25px;
  }

  label:after {
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    content: '';
    height: 5px;
    left: 6px;
    opacity: 0;
    position: absolute;
    top: 6.5px;
    transform: rotate(-45deg);
    width: 10px;
  }
  input[type='checkbox'] {
    width: 28px;
    height: 28px;
    // left: 0;
    // position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    visibility: hidden;
  }

  input[type='checkbox']:checked + label {
    background-color: ${(p) =>
      p.isHovered
        ? 'var(--color-default-green-opacity)'
        : 'var(--color-checked-inactive)'};
    border-color: ${(p) =>
      p.isHovered
        ? 'var(--color-default-green-opacity)'
        : 'var(--color-checked-inactive)'};
  }

  input[type='checkbox']:checked + label:after {
    opacity: 1;
  }
`;

const Checkbox = ({
  id,
  isChecked,
  setIsChecked,
  isHovered,
  setIsHovered,
  handleCheck,
}: CheckboxProps) => {
  const [uniqueId] = useState<string>(
    () => `checkbox_${Math.random().toString(36).substring(7)}`,
  );

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log('checked handler!');
    handleCheck({ qnaId: id, isChecked: event.target.checked });
    setIsChecked(event.target.checked);
  };

  const handleHover = (event: MouseEvent<HTMLLabelElement>) => {
    if (setIsHovered) {
      // console.log('hovering: ', event.type === 'mouseenter');
      setIsHovered(event.type === 'mouseenter');
    }
  };

  useEffect(() => {
    // console.log('remounting checkbox!');
  }, [isHovered]);

  return (
    <Round isHovered={isHovered}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        id={uniqueId}
      />
      <label
        htmlFor={uniqueId}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      ></label>
    </Round>
  );
};

export default Checkbox;
