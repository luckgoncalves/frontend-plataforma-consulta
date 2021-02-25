import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: fixed;

  height: 100%;
  width: 100%;
  top: 0;

  background-color: #0c0c0ca8;
  
  > div {
    margin: auto;
  }

  svg {
    circle {
      color: var(--green);
    }
  }

`;
