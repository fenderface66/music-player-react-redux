import styled from 'styled-components';


const SongData = styled.div`
  height: 100%;
  width: 100%;
  color: black;
  
  text-decoration: none;

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px;
    height: 100%;
  }

  li {
    width: 33%;
    padding-left: 14px;
    white-space: nowrap;
    overflow: hidden;
    &:first-child {
      padding-left: 12px;
    }
    &.rating {
      padding: left;
      text-align: center;
      span {
        font-size: 18px;
        cursor: pointer;
      }
      span:first-child {
        margin-right: 4px;
      }
      span:last-child {
        margin-left: 4px;
      }
    }
  }
  @media (min-width: 450px) {
      
    li {
      width: 20%;
    }
  }
  
`;

export default SongData;