import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Header from './Header';

function App() {
  return (
    <div>
      <Header />
      <Container sx={{ paddingTop: 2 }}>
        <Typography variant="h4">Hello!</Typography>
      </Container>
    </div>
  );
}

export default App;
