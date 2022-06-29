import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import { PlayInfo } from './types';
import { currentPlayIdState, speechesStateFamily } from './state';
import DramatisPersonaeCmp from './DramatisPersonae';
import ParticDesc from './ParticDesc';
import SpeechesList from './SpeechesList';
import { makeEpUrl } from './utils';

export default function Play() {
  const { playId } = useParams();
  const [info, setInfo] = useState<PlayInfo | null>(null);
  const [speeches, setSpeeches] = useRecoilState(speechesStateFamily(playId));
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const setPlayId = useSetRecoilState(currentPlayIdState);

  useEffect(() => {
    setPlayId(playId || null);
    return () => setPlayId(null);
  }, [playId, setPlayId]);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const rsp = await axios.get(
          `${process.env.PUBLIC_URL}/plays/${playId}.json`
        );
        // eslint-disable-next-line no-console
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const colWidth = info.dramatisPersonae.id ? 4 : 6;

  return (
    <Box sx={{ height: '100%', display: 'flex' }} flexDirection="column">
      <Typography variant="h5" mb={1.5}>
        {info?.authors.join(' · ')}
        {': '}
        {info?.title}{' '}
        <Link
          href={makeEpUrl(info.id)}
          title="Open in earlyprint.org"
          target="_blank"
        >
          {info.id}
        </Link>
      </Typography>

      <Grid container spacing={2} sx={{ height: '100%' }}>
        {info.dramatisPersonae.id && (
          <Grid
            item
            xs={colWidth}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <DramatisPersonaeCmp data={info.dramatisPersonae} />
          </Grid>
        )}
        <Grid
          item
          xs={colWidth}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <ParticDesc dp={info.dramatisPersonae} speeches={info.speeches} />
        </Grid>
        <Grid
          item
          xs={colWidth}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <SpeechesList speeches={info.speeches} />
        </Grid>
      </Grid>
    </Box>
  );
}
