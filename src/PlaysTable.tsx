import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Play } from './types';

export default function PlaysTable() {
  const [plays, setPlays] = useState<Play[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const rsp = await axios.get('/plays.json');
        setPlays(rsp.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        setError(true);
      }
      setLoading(false);
    }
    fetch();
  }, []);

  if (error) {
    return <Typography>An error occured</Typography>;
  }

  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Authors</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>ID</TableCell>
            <TableCell title="dramatis personae">DP</TableCell>
            <TableCell>@who</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {plays.map((play) => (
            <TableRow
              key={play.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{play.authors.join(' · ')}</TableCell>
              <TableCell>
                <Link to={play.id}>{play.title}</Link>
              </TableCell>
              <TableCell>
                <a
                  href={`https://texts.earlyprint.org/works/${play.id}.xml`}
                  target="ep"
                  title="Read at EarlyPrint.org"
                >
                  {play.id}
                </a>
              </TableCell>
              <TableCell>{play.hasDramatisPersonae ? 'yes' : 'no'}</TableCell>
              <TableCell>{play.hasWho ? '@who' : ''}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
