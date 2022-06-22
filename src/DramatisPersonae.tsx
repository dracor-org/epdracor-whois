import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListContainer } from './Layout';
import { DramatisPersonae } from './types';

interface Props {
  data: DramatisPersonae;
}

export default function DramatisPersonaeCmp({
  data: { id, pb, items },
}: Props) {
  const playId = id.split('-')[0];
  const page = pb?.replace(/^[^-]+-/, '');
  const url = `https://texts.earlyprint.org/works/${playId}.xml?page=${page}`;
  return (
    <>
      <Box sx={{ flexShrink: 0 }}>
        <Typography variant="h6" component="span">
          Dramatis Personae
        </Typography>
        <Tooltip title="Open in EarlyPrint">
          <IconButton href={url} target="_blank" rel="noreferrer">
            <BookOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <ListContainer>
        <List dense>
          {items
            .filter((item) => item[0] !== '')
            .map((item) => (
              <ListItem key={item[0]} title={item[1] || item[0]}>
                <ListItemText>{item[0]}</ListItemText>
              </ListItem>
            ))}
        </List>
      </ListContainer>
    </>
  );
}
