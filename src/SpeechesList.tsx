import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { Speech } from './types';
import { uniqueSpeakersQuery } from './state';
import { ListContainer } from './Layout';
import SpeechesListItem from './SpeechesListItem';

interface Props {
  speeches: Speech[];
}

export default function SpeechesList({ speeches }: Props) {
  const { playId } = useParams();
  const uniqueSpeakers = useRecoilValue(uniqueSpeakersQuery(playId || ''));

  return (
    <>
      <Typography variant="h6">Speakers</Typography>
      <ListContainer>
        <List dense>
          {uniqueSpeakers.map((s, i) => (
            <SpeechesListItem key={s} speaker={s} />
          ))}
        </List>
      </ListContainer>
    </>
  );
}
