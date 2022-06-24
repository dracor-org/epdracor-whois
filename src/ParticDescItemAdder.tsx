import { useState, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ParticDescItem } from './types';
import { makeId } from './utils';

interface Props {
  onAdd: (item: ParticDescItem) => void;
}

export default function ParticDescItemAdder({ onAdd }: Props) {
  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');

  const nameRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);

  function handleAdd() {
    if (!name) {
      return;
    }
    const item: ParticDescItem = {
      name,
      id: id || makeId(name),
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
          onChange={(e) => setId(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button
          variant="contained"
          disabled={!name}
          onClick={handleAdd}
          sx={{ marginLeft: 1 }}
        >
          Add
        </Button>
      </CardContent>
    </Card>
  );
}
