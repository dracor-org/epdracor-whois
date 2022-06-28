import { useState, KeyboardEvent } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {
  currentPlayIdState,
  speechesStateFamily,
  selectParticDescIds,
} from './state';

interface Props {
  speaker: string;
}

export default function IdAdder({ speaker }: Props) {
  const [value, setValue] = useState<string | null>(null);
  const ids = useRecoilValue(selectParticDescIds);
  const playId = useRecoilValue(currentPlayIdState);
  const setSpeeches = useSetRecoilState(speechesStateFamily(playId));

  function onKeyPress(e: KeyboardEvent) {
    if (!value) {
      return;
    }
    if (e.key === 'Enter') {
      setSpeeches((oldSpeeches) => {
        return oldSpeeches.map((speech) => {
          if (speech.speaker === speaker) {
            const whos = speech.whos ? [...speech.whos] : [];
            if (whos.indexOf(value) < 0) {
              whos.push(value);
            }
            return { ...speech, whos };
          }
          return speech;
        });
      });
      setValue(null);
    }
  }

  return (
    <Autocomplete
      options={ids}
      size="small"
      value={value}
      renderInput={(params) => (
        <TextField {...params} size="small" sx={{ minWidth: '120px' }} />
      )}
      noOptionsText="No speaker IDs available. Add particDesc entries first!"
      autoComplete={true}
      autoSelect={true}
      onChange={(e, v) => setValue(v)}
      onKeyPress={onKeyPress}
      sx={{ marginX: 0.5 }}
    />
  );
}
