import { ChangeEvent, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { SxProps } from '@mui/material';

interface Props {
  text: string;
  onChange: (text: string) => void;
  render?: (text: string) => any;
  sx?: SxProps;
}

export default function Editable({ text, onChange, render, sx }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(text);

  function editText(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValue(e.target.value);
  }

  function save() {
    setEditMode(false);
    onChange(value);
  }

  return (
    <>
      {editMode ? (
        <TextField
          autoFocus
          value={value}
          onBlur={save}
          onChange={editText}
          onKeyPress={(e) => e.key === 'Enter' && save()}
          size="small"
          sx={sx}
        />
      ) : (
        <Box onClick={() => setEditMode(true)} component="span">
          {render ? render(value) : value}
        </Box>
      )}
    </>
  );
}
