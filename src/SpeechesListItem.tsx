import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import SpeechesLinks from './SpeechesLinks';

interface Props {
  speaker: string;
}

export default function SpeechesListItem({ speaker }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem>
        <ListItemText>{speaker}</ListItemText>
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
