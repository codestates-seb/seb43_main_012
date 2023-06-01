import styled from 'styled-components';

export const IconItems = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const IconItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--b60);
  margin: 0 5px;

  svg {
    width: var(--size-icon-default);
    height: var(--size-icon-default);
    fill?: currentColor;
    stroke?: currentColor;
    // stroke: currentColor;
  }

  svg:hover {
    fill?: black;
    stroke?: black;
  }

  &: hover {
    cursor: pointer;
    color: black;
  }

  @media (max-width: 480px) {
    margin: 5px;

    svg {
      width: var(--size-icon-mobile);
      height: var(--size-icon-mobile);
    }
  }
`;
