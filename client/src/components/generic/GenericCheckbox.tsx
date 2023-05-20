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
  size?: string;
  handleCheck?: (...params: any[]) => void; //how to set any params
  checked?: boolean;
  disabled?: boolean;
};

type StyleProps = {
  isHovered?: boolean;
  size?: string;
};

const Round = styled.div<StyleProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  label {
    background-color: #fff;
    border: 1px solid #ccc;
    border: 1px solid ${(p) => (p.isHovered ? '#000' : '#ccc')};
    border-radius: 50%;
    cursor: pointer;
    height: ${(p) =>
      p.size
        ? p.size === 'medium'
          ? '25px'
          : p.size === 'small'
          ? '18px'
          : '25px'
        : '25px'};
    left: 0;
    position: absolute;
    top: 0;
    width: ${(p) =>
      p.size
        ? p.size === 'medium'
          ? '25px'
          : p.size === 'small'
          ? '18px'
          : '25px'
        : '25px'};
  }

  label:after {
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    content: '';
    height: ${(p) =>
      p.size
        ? p.size === 'medium'
          ? '5px'
          : p.size === 'small'
          ? '3.5px'
          : '5px'
        : '5px'};
    left: ${(p) =>
      p.size
        ? p.size === 'medium'
          ? '6px'
          : p.size === 'small'
          ? '3px'
          : '6px'
        : '6px'};
    opacity: 0;
    position: absolute;
    top: ${(p) =>
      p.size
        ? p.size === 'medium'
          ? '6.5px'
          : p.size === 'small'
          ? '4.5px'
          : '6.5px'
        : '6.5px'};
    transform: rotate(-45deg);
    width: ${(p) =>
      p.size
        ? p.size === 'medium'
          ? '10px'
          : p.size === 'small'
          ? '8px'
          : '10px'
        : '10px'};
  }
  input[type='checkbox'] {
    width: ${(p) =>
      p.size
        ? p.size === 'medium'
          ? '25px'
          : p.size === 'small'
          ? '18px'
          : '25px'
        : '25px'};
    height: ${(p) =>
      p.size
        ? p.size === 'medium'
          ? '25px'
          : p.size === 'small'
          ? '18px'
          : '25px'
        : '25px'};
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

const GenericCheckbox = ({
  id,
  size,
  handleCheck,
  checked,
  disabled,
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked || false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [uniqueId] = useState<string>(
    () => `checkbox_${Math.random().toString(36).substring(7)}`,
  );

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    // console.log('id: ', id);
    // console.log('clicked checkbox: ', event.target.id);
    if (handleCheck)
      handleCheck({ id: id, newCheckValue: event.target.checked });
    setIsChecked(event.target.checked);
  };

  const handleHover = (event: MouseEvent<HTMLLabelElement>) => {
    if (setIsHovered) {
      setIsHovered(event.type === 'mouseenter');
    }
  };

  useEffect(() => {
    // console.log('remounting checkbox!');
  }, [isHovered]);

  return (
    <Round isHovered={isHovered} size={size}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        id={uniqueId}
        disabled
      />
      <label
        htmlFor={uniqueId}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      ></label>
    </Round>
  );
};

export default GenericCheckbox;
