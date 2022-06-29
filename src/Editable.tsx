import { ChangeEvent, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { SxProps } from '@mui/material';

interface Props {
  text: string;
  onChange: (text: string) => void;
  validate?: (text: string) => boolean;
  render?: (text: string) => any;
  sx?: SxProps;
}

export default function Editable({
  text,
  sx,
  onChange,
  render,
  validate,
}: Props) {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(text);

  function editText(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValue(e.target.value);
  }

  function save() {
    setEditMode(false);
    onChange(value);
  }

  const isValid = validate ? validate(value) : true;

  return (
    <>
      {editMode ? (
        <TextField
          autoFocus
          value={value}
          error={!isValid}
          onBlur={save}
          onChange={editText}
          onKeyPress={(e) => e.key === 'Enter' && save()}
          size="small"
          sx={sx}
        />
      ) : (
        <Box onClick={() => setEditMode(true)} component="span">
          {render ? render(text) : text}
        </Box>
      )}
    </>
  );
}
