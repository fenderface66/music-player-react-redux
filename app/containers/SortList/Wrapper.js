import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #94c6f1;
  margin-top: 24px;
  ul {
    display: flex;
    justify-content: space-between;
    padding: 0;
  
  }

  span, li {
    color: white;
    padding: 3px 6px;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-left: 1px solid white;
    cursor: pointer;
    width: 33%;
    white-space: nowrap;
    transition: .2s;
    overflow:hidden;
    &:first-child {
      border-left: 0;
      padding-left: 12px;
    }
    &:last-child {
      padding-right: 12px;
    }
    &:hover {
      background-color: #75b9f4;
    }
  }
   @media (min-width: 450px) {
    li {
      width: 20%;
    }  
  }
  
`;


export default Wrapper;
