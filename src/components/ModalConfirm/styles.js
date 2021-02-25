import styled from 'styled-components';
import { Modal } from  'reactstrap'


export const Container = styled.div`

  .header {
      h5 {
        font-size: 26px;
        font-weight: 700;
        line-height: 31.2px;

        color: #303030;
      }

      border: none;
  }
  
  .content {
    background-color: #fff !important;
  

  }
    .footer {

        display: flex;
        justify-content: center;

        button {
          margin-right: 8px;
          width: 50% !important;

          &:last-child {
            margin-right: 0;
          }
        }
    }

`;

export const Box = styled.div`
    border: 1px solid var(--gray-4);
    padding: 1.5rem;
    margin: 1.5rem 0;

    div {
        text-align: left;
        h5 {
            font-size: 16px;
            color: #0B0B0B;
            margin: 0;
        }

        p {
            color: #A5A5A5;
        }
    }
`;
