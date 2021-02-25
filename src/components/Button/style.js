import styled from 'styled-components'
import { Button } from '@material-ui/core'

export const NextSteps = styled(Button)`
  background-color: ${({disabled, colorbutton}) => disabled ? 'var(--gray-4)' : colorbutton} !important;
  
  text-transform: capitalize !important;
  border: none !important;
  box-shadow: none !important;
  height: 59px;

  outline: none !important;

  span{ 
    color: var(--white) !important;
    font-family: 'AvenirBold';
    font-size: 16px;
  }

  &:hover{
    background-color: var(--green);
    opacity: 0.8;
  }

  &:visited{
    background-color: var(--green);
  }
`;

export const LinkButtom = styled.a`
  background-color: ${props => props.colorbutton} !important;
  text-transform: capitalize !important;
  border: none !important;

  color: var(--white);
  display: flex;
  justify-content: center;
  
  align-items: center;
  box-shadow: none !important;
  height: 59px;
  
  span{ 
    color: var(--white) !important;
    font-family: 'AvenirBold';
    font-size: 16px;
  }
  
  &:hover{
    text-decoration: none;
    color: var(--white);
    opacity: 0.8;
  }
`;

export const BtRadio = styled(Button)`
  
`;