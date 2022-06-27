import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import SpeechesLinks from './SpeechesLinks';
import {
  currentPlayIdState,
  speechesBySpeakerQuery,
  speechesStateFamily,
} from './state';
import IdAdder from './IdAdder';

interface Props {
  speaker: string;
}

export default function SpeechesListItem({ speaker }: Props) {
  const [open, setOpen] = useState(false);
  const playId = useRecoilValue(currentPlayIdState) || '';
  const speeches = useRecoilValue(speechesBySpeakerQuery({ playId, speaker }));
  const setSpeeches = useSetRecoilState(speechesStateFamily(playId));

  const whos = speeches
    .map((s) => s.whos || [])
    .flat()
    .filter((s, i, self) => self.indexOf(s) === i);

  function handleDelete(id: string) {
    setSpeeches((oldSpeeches) => {
      return oldSpeeches.map((speech) => {
        if (speech.speaker === speaker) {
          const whos = speech.whos?.filter((w) => w !== id);
          return { ...speech, whos };
        }
        return speech;
      });
    });
  }

  return (
    <>
      <ListItem>
        <ListItemText>{speaker}</ListItemText>
        {whos.map((w) => (
          <Chip
            key={w}
            label={w}
            onDelete={() => handleDelete(w)}
            size="small"
          />
        ))}
        <IdAdder speaker={speaker} />
        {open ? (
          <ExpandLess onClick={() => setOpen(false)} />
        ) : (
          <ExpandMore onClick={() => setOpen(true)} />
        )}
      </ListItem>
      <Collapse in={open}>
        <SpeechesLinks speaker={speaker} />
      </Collapse>
    </>
  );
}
