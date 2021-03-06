import { ReactElement } from 'react';
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

export function ListContainer({ children }: { children: ReactElement }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        overflow: 'auto',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

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
