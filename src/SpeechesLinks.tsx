import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { speechesBySpeakerQuery } from './state';
import { Speech } from './types';
import { makeEpUrl, stripEpId } from './utils';

interface Props {
  speaker: string;
}

export default function SpeechesLinks({ speaker }: Props) {
  const { playId = '' } = useParams();
  const speeches = useRecoilValue(speechesBySpeakerQuery({ playId, speaker }));

  return (
    <Box px={2}>
      {speeches.map((s, i) => (
        <span key={s.id}>
          {i > 0 && ', '}
          <SpeechLink speech={s} />
        </span>
      ))}
    </Box>
  );
}

function SpeechLink({ speech: { id, pb, who } }: { speech: Speech }) {
  const { playId } = useParams();

  if (!id) {
    return null;
  }

  if (!playId || !pb) {
    return (
      <Box component="span" sx={{ typography: 'body2' }}>
        {stripEpId(id)}
      </Box>
    );
  }

  const url = makeEpUrl(playId, pb);

  return (
    <Link
      href={url}
      underline="hover"
      variant="body2"
      target="_blank"
      title={who || ''}
    >
      {stripEpId(id)}
    </Link>
  );
}
