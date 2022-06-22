import Typography from '@mui/material/Typography';
import { ListContainer } from './Layout';
import { Speech } from './types';

interface Props {
  speeches: Speech[];
}

export default function SpeechesList({ speeches }: Props) {
  const uniqueSpeakers = speeches
    .map((s) => s.speaker)
    .filter((s, i, self) => self.indexOf(s) === i);

  return (
    <>
      <Typography variant="h6">Speakers</Typography>
      <ListContainer>
        <ul>
          {uniqueSpeakers.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </ListContainer>
    </>
  );
}
