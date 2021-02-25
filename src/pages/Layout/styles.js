import styled from 'styled-components';

export const Container = styled.div`
  background-color: #262626; 
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column-reverse;

  padding: 0 20px 190px;

  @media(min-width: 1000px) {
    flex-direction: row;
  }

`;


export const Body = styled.div`
    width: 70vw;
    flex-direction: column;

    @media (max-width: 990px) { 
  
        max-width: 980px !important;
        margin: 0 10px;
    }

    @media(min-width: 1000px) {
        flex-direction: row;
    }

    @media (max-width: 1900px) { 
        width: 95vw;
        max-width: 1180px;
        margin: 0 10px;
    }
`;

export const Steps = styled.div`

    display: ${props => props.active ? 'flex' : 'none' };
    justify-content: space-between;

    @media(min-width: 1000px) {
        flex-direction: column;
        justify-content: center;
    }
  
`;

export const ListFields = styled.form`
  background: var(--white);
  border-radius: 6px;

  width: 587px;
  max-width: 100%;
  margin: auto 20px;

  padding: 50px;
`;

export const TitleForm = styled.h2`
  font-size: 26px;
  font-weight: 700;
  line-height: 31.2px;

  color: #303030;
`;