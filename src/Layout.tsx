import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from './Header';

export const AbsoluteBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}));

export default function Layout() {
  return (
    <>
      <Header />
      <Container
        maxWidth={false}
        sx={{
          flexGrow: 1,
          position: 'relative',
          marginTop: 2,
        }}
      >
        <Outlet />
      </Container>
    </>
  );
}
