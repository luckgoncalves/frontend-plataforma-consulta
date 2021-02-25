import styled from 'styled-components';
import { Modal } from  'reactstrap'


export const Container = styled(Modal)`

  .modal-content {
    background-color: #fff !important;
  
    .modal-header {
        h5 {
            color: black;
        }
    }

    .modal-body {
        color: black;

        form { 
            h1 {
                font-size: 26px;
                color: #000000;
                text-align: left;
            }
            .form-group {
                text-align: left;
            }
        }
    }

    .modal-footer {

        display: flex;
        justify-content: center;

        button {
            width: 184px;
            border: none;

            &:hover {
                opacity: 0.8;
            }
        }

        .cancel {
            background-color: transparent;
            color: #A9A9A9;
        }

        .submit {
            background-color: #0FBB00;
            color: #fff;
        }
    }
  }

`;

export const Error = styled.p`
    color: red;
    text-align: left;
`;
