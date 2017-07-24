import styled from 'styled-components';

const Wrapper = styled.div`
  
  background-color: #94c6f1;
  padding: 12px;
  transition: .2s;
  .ui-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: relative;
  }
  .info-container {
    display: flex;
    justify-content: center;
    p {
      margin: 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      text-align: center;
      color: white;
    }
  }
`;


export default Wrapper;
