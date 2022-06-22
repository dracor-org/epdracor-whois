import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { ParticDescItem } from './types';

interface Props {
  data: ParticDescItem;
  onDelete: () => void;
}

export default function ParticDescItemCmp({
  data: { id, name, isGroup: isGroupProp, sex: sexProp },
  onDelete,
}: Props) {
  const [isGroup, setIsGroup] = useState(isGroupProp);
  const [sex, setSex] = useState(sexProp);

  function cycleSex() {
    switch (sex) {
      case 'FEMALE':
        setSex('MALE');
        break;
      case 'MALE':
        setSex('UNKNOWN');
        break;
      case 'UNKNOWN':
        setSex(undefined);
        break;
      default:
        setSex('FEMALE');
        break;
    }
  }

  return (
    <Card>
      <CardContent sx={{ padding: 1, paddingBottom: 0, textAlign: 'left' }}>
        <Tooltip title={isGroup ? 'personGrp' : 'person'}>
          <IconButton onClick={() => setIsGroup(!isGroup)}>
            {isGroup ? <GroupIcon /> : <PersonIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title={`Sex: ${sex || 'not defined'}`}>
          <IconButton onClick={cycleSex}>
            {!sex && <QuestionMarkIcon sx={{ opacity: 0.5 }} />}
            {sex === 'FEMALE' && <FemaleIcon />}
            {sex === 'MALE' && <MaleIcon />}
            {sex === 'UNKNOWN' && <QuestionMarkIcon />}
          </IconButton>
        </Tooltip>
        <IconButton onClick={onDelete} size="small">
          <DeleteIcon fontSize="small" />
        </IconButton>
        <Chip label={id} size="small" />
        <Typography variant="h6" component="div">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}
