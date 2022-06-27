import { useRecoilValue } from 'recoil';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { currentPlayIdState } from './state';
import DownloadButton from './DownloadButton';

export default function Header() {
  const playId = useRecoilValue(currentPlayIdState);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          noWrap
          sx={{
            flexGrow: 1,
            '& > a': { color: 'white', textDecoration: 'none' },
          }}
        >
          <Link to="/">Who is @who in EPDraCor</Link>
        </Typography>
        {playId && (
          <div>
            <DownloadButton />
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
