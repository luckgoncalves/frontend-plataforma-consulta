import styled from 'styled-components';
import { Form, Modal } from 'react-bootstrap'
import { FormControl, FormControlLabel, FilledInput, Link } from '@material-ui/core'

export const Label = styled(Form.Label)`
  font-family: 'AvenirRegular-600';
`;

export const Span = styled.span`
  color: var(--gray-2);
  font-family: 'AvenirRegular';
`;

export const Input = styled(Form.Control)`
  background-color: var(--white) !important;
  border: 1px solid #949494 !important;
  box-sizing: border-box;

  border-radius: 4px;
  color: var(--gray-2) !important;
  height: 59px;
  box-shadow: none;
  
  &:active{
    border-color: 1px solid #949494 !important;
  }`;

export const FieldSet = styled(FormControl)`
  width: 100%;

  select { 
    height: 59px;
    padding: 0 1rem;

    font-size: 16px;
    color: var(--gray-2);
    font-family: 'AvenirRegular'
  }
`;

export const RadioInput = styled(FormControlLabel)`
  width: 100%;
  color: var(--gray-2);

  .MuiButtonBase-root{
    color: var(--gray-2) !important;
  }
`;

export const TextStep3 = styled.h2`
  font-size: 1.9rem;
  line-height: 31px;
  font-family: 'AvenirRegular';
`;

export const TagLabel = styled.span`
  height: 30px;
  color: var(--white);
  background: var(--gray-2);
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 2rem;
`;

export const InputButtom = styled(FilledInput)`
  background-color: var(--white) !important;
  height: 59px;
  border: 1px solid #949494;
  border-radius: 4px;
  
  input{
    height: 100%;
    font-family: 'AvenirRegular';
    color: var(--gray-2);
    padding: 0rem 1rem;
  }

  &::before {
    border-bottom: none !important;
  }
`;

export const CloseTag = styled.span`
  cursor: pointer;
  color: var(--white);
  margin-left: 1rem;
`;

export const ModalFinally = styled(Modal)`
  h3{
    font-size: 1.37rem;
  }

  .modal-content{
    width: 35rem !important;

    @media(max-width: 1024px){
      width: 100% !important;
    }

    background-color: var(--white) !important;
  }

  .modal-content .modal-header{
    border-bottom: none;
  }

  .modal-content .modal-title{
    color: var(--gray-3);
    border-bottom: none;
  }

  .modal-content .modal-body{
    border-top: none;
    color: var(--gray-3);
    text-align: left;
  }
`;

export const LinkNavegate = styled(Link)`
  color: ${props => props.type === 'termos' ? '#9C9C9C' : 'var(--green)' } !important;
  font-weight: 600 !important;
  text-decoration:underline !important;
  font-size: 1rem !important;
`;

export const ButtonNavigate = styled(Link)`
  background-color: var(--green);
  color: var(--white) !important;
  text-align: center;
  
  padding: 1rem 0 1rem 0;
  border-radius: 4px;

  &:hover{
    background-color: var(--green-dark);
    text-decoration: none !important;
  }
`;