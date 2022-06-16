import { Link, Outlet, Routes, Route, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Layout, { AbsoluteBox } from './Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="plays" element={<Plays />}>
          <Route path=":playId" element={<Play />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

function Home() {
  return (
    <Box textAlign="center" pt={3}>
      <Button component={Link} to="plays" variant="outlined">
        Go to plays
      </Button>
    </Box>
  );
}

function Plays() {
  return (
    <>
      <AbsoluteBox sx={{ overflow: 'auto' }}>
        <ul>
          {Array(30)
            .fill(1)
            .map((_, i) => (
              <li>
                <Link to={`${i + 1}`}>Play {i + 1}</Link>
              </li>
            ))}
        </ul>
      </AbsoluteBox>
      <Outlet />
    </>
  );
}

function Play() {
  const { playId } = useParams();
  return (
    <AbsoluteBox sx={{ backgroundColor: 'white' }}>
      <Container maxWidth={false}>
        <Typography variant="h1">Play {playId}</Typography>
        <Link to={`..`}>close</Link>
      </Container>
    </AbsoluteBox>
  );
}
