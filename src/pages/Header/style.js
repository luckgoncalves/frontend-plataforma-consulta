import styled from 'styled-components'


export const Header = styled.header`

  padding: 140px 1.5rem 0;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 
  color: white;
  text-align: center;
 
  background-color: var(--primary);

  > div{
    width: 537px;
    max-width: 100%;
    
    h1{
      font-size: 30px;
      font-family: 'AvenirBold';
    }
  
    p{
      font-family: 'AvenirRegular-500';
      
      font-size: 16px;
      line-height: 19.2px
    }
  }
  
  
`;

export const NavBar = styled.div`
  position: fixed;
  z-index: 2;
  background: var(--primary);

  padding: 0 3rem;

  width: 100%;
  display: flex;
  align-items: center;
  
  .logo {
    width: 200px;
    margin: 1.5rem 0;

    @media(min-width:1000px) {
      width: initial;
    }
  }

  ul {
    display: none;
    
    list-style: none;
    margin-left: auto;
    margin-right: 100px;
  
    @media(min-width:1000px) {
      display: flex;
    }
    
    li {
      margin: 0 1.5rem;

      a {
        cursor: pointer;

        font-size: 14px;
        font-weight: 700;
        color: var(--white);
  
        &:hover {
          color: var(--white);
          opacity: 0.8;
          
        }
      }

      ul {
        display: none;
        position: absolute; 
      
        width: 300px; 
        background: var(--white); 
        padding: 1.5rem !important;
      
        border-radius: 4px;

        li {
          margin: 0.5rem 0 !important;
          a {
            color: var(--primary);
          }
        }
      }

      &:hover {
        ul {
          display: flex;
          li {
         
            a {
              color: var(--primary);
            }
          }
        }
      }
    }
  }

 .menu {
    margin-left: auto;


    @media(min-width: 1000px) {
      display: none;
    }
  }
`;

export const MenuMobile = styled.ul`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    
    display: ${props => props.toggle ? 'flex' : 'none'};
    background: var(--primary);
    
    list-style: none;
    padding-top: 100px;
    /* z-index: 3; */

    @media(min-width: 1000px) {
      display: none;
    }
    
    li {
      margin: 0 1.5rem;
      text-align: center;

      a {
        cursor: pointer;

        font-size: 14px;
        font-weight: 700;
        color: var(--white);

        &:hover {
          color: var(--white);
          opacity: 0.8;
        }
      }

      ul {
        display: none;
        list-style: none;

        width: 300px; 
      
        border-radius: 4px;

        li {
          &:nth-child(n+1) {
            padding: 0.5rem 0 !important;
          }

          a {
            color: var(--white);
          }

        }
      }

      &:hover {
        ul {
          display: flex;
        }
      }
    }
`;