import React from 'react';
import { CircularProgress } from '@material-ui/core'

import { Container } from './styles';

function Load() {
  return (
    <Container>
      <CircularProgress disableShrink/>
    </Container>
  );
}

export default Load;