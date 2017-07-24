import styled from 'styled-components';

const UIButton = styled.div`
  position: relative;
  border: 1px solid white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  svg {
    font-size: 14px;
    color: white;
  }
  &:nth-child(2) {
    margin: 0 6px;
  }
`;

export default UIButton;
