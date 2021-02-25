import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --primary: #262626;
    
    --white: #FFFFFF;
    
    --green: #0FBB00;
    --grenn-dar: #0fbb0094;
    
    --gray:  rgba(255, 255, 255, 0.3);
    --gray-2: #555555;
    --gray-3: #595959;
    --gray-4: #A5A5A5;
    
    --bt-plus: #4ACCCD;
  }
  
  #root {
    background: var(--primary);
    height: 100vh;
    
    display: flex;
    flex-direction: column;
  }
`;