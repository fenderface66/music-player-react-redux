import styled from 'styled-components';

const Form = styled.form`

  fieldset {
    border: 0px;
    padding: 10px 0;
    display: block;
    span, label {
      margin-right: 12px;
    }
  }

  label {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 600;
  }

  button, input[type="submit"] {
    color: #fff;
    border: 1px solid #eee;
    border-radius: 3px;
    box-shadow: 5px 5px 5px #eee;
    text-shadow: none;
    padding: 5px 15px;
    margin-top: 10px;
    margin-left: 2px;
    cursor: pointer;
    display: inline-block;
    transition: .2s;
    outline: none;
  }

  input[type="submit"] {
    background: #94c6f1;
    &:hover {
      background: #016ABC;
      border: 1px solid #eee;
    }
  }

  button {
    background: #E54B4B;
    &:hover {
      background: #b42b2b;
      border: 1px solid #eee;
    }
  }

  @media (min-width: 800px) {
    fieldset {
      display:inline-block;
      margin-left: 12px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
`;

export default Form;
