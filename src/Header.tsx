import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ '& > a': { color: 'white', textDecoration: 'none' } }}
        >
          <Link to="/">Who is @who in EPDraCor</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
