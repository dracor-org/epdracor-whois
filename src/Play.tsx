import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { PlayInfo } from './types';
import { speechesStateFamily } from './state';
import DramatisPersonaeCmp from './DramatisPersonae';
import ParticDesc from './ParticDesc';
import SpeechesList from './SpeechesList';
import Download from './Download';

export default function Play() {
  const { playId } = useParams();
  const [info, setInfo] = useState<PlayInfo | null>(null);
  const [speeches, setSpeeches] = useRecoilState(speechesStateFamily(playId));
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const rsp = await axios.get(`/plays/${playId}.json`);
        console.log(rsp.data);
        setInfo(rsp.data);
        if (speeches.length === 0 && rsp.data.speeches.length > 0) {
          setSpeeches([...rsp.data.speeches]);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        setError(true);
      }
      setLoading(false);
    }
    fetch();
  }, [playId]);

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

  if (!info) {
    return <></>;
  }

  return (
    <Box sx={{ height: '100%', display: 'flex' }} flexDirection="column">
      <Typography variant="h5" mb={1.5}>
        {info?.authors.join(' · ')}
        {': '}
        {info?.title}
        {` (${info.id})`}
      </Typography>

      <Box>
        <Download />
      </Box>

      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column' }}>
          {info?.dramatisPersonae.id ? (
            <DramatisPersonaeCmp data={info.dramatisPersonae} />
          ) : (
            <Typography variant="h6" sx={{ opacity: 0.5 }}>
              Dramatis personae
            </Typography>
          )}
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column' }}>
          <ParticDesc dp={info.dramatisPersonae} speeches={info.speeches} />
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column' }}>
          <SpeechesList speeches={info.speeches} />
        </Grid>
      </Grid>
    </Box>
  );
}
