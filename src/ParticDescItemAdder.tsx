import { useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ParticDescItem } from './types';
import { makeId } from './utils';
import { selectParticDescIds } from './state';

interface Props {
  onAdd: (item: ParticDescItem) => void;
}

export default function ParticDescItemAdder({ onAdd }: Props) {
  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const currentIds = useRecoilValue(selectParticDescIds);

  const nameRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);

  function isValid(id: string) {
    if (currentIds.includes(id)) {
      return false;
    }
    if (!id.match(/^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/i)) {
      return false;
    }
    return true;
  }

  function handleAdd() {
    if (!name) {
      return;
    }
    const newId = id || makeId(name);
    if (!isValid(newId)) {
      // eslint-disable-next-line no-console
      console.log('invalid ID');
      return;
    }
    const item: ParticDescItem = {
      name,
      id: newId,
      isGroup: false,
    };
    setName('');
    setId('');
    if (nameRef.current) {
      nameRef.current.value = '';
    }
    if (idRef.current) {
      idRef.current.value = '';
    }
    onAdd(item);
  }

  return (
    <Card sx={{ marginBottom: 1 }}>
      <CardContent sx={{ padding: 1 }}>
        <TextField
          label="Name"
          size="small"
          variant="standard"
          inputRef={nameRef}
          sx={{ marginBottom: 1, marginRight: 1 }}
          InputLabelProps={{ shrink: true }}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <TextField
          label="ID"
          size="small"
          variant="standard"
          inputRef={idRef}
          placeholder={makeId(name)}
          InputLabelProps={{ shrink: true }}
          error={Boolean(name && !isValid(id || makeId(name)))}
          helperText={
            currentIds.includes(id || makeId(name)) ? 'ID already in use' : ''
          }
          onChange={(e) => setId(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button
          variant="contained"
          disabled={!name || !isValid(id || makeId(name))}
          onClick={handleAdd}
          sx={{ marginLeft: 1 }}
        >
          Add
        </Button>
      </CardContent>
    </Card>
  );
}
