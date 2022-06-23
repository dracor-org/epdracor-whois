import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
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
import Editable from './Editable';

interface Props {
  data: ParticDescItem;
  index: number;
  onDelete: () => void;
}

export default function ParticDescItemCmp({
  data: { id: idProp, name: nameProp, isGroup: isGroupProp, sex: sexProp },
  index,
  onDelete,
}: Props) {
  const [isGroup, setIsGroup] = useState(isGroupProp);
  const [sex, setSex] = useState(sexProp);
  const [name, setName] = useState(nameProp);
  const [id, setId] = useState(idProp);

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
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card>
            <CardContent
              sx={{ padding: 1, paddingBottom: 0, textAlign: 'left' }}
            >
              <Tooltip title={isGroup ? 'personGrp' : 'person'}>
                <IconButton onClick={() => setIsGroup(!isGroup)} size="small">
                  {isGroup ? (
                    <GroupIcon fontSize="small" />
                  ) : (
                    <PersonIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title={`Sex: ${sex || 'not defined'}`}>
                <IconButton onClick={cycleSex}>
                  {!sex && (
                    <QuestionMarkIcon fontSize="small" sx={{ opacity: 0.5 }} />
                  )}
                  {sex === 'FEMALE' && <FemaleIcon fontSize="small" />}
                  {sex === 'MALE' && <MaleIcon fontSize="small" />}
                  {sex === 'UNKNOWN' && <QuestionMarkIcon fontSize="small" />}
                </IconButton>
              </Tooltip>
              <IconButton onClick={onDelete} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
              <Editable
                text={id}
                onChange={(t) => setId(t)}
                render={(text) => <Chip label={text} size="small" />}
              />
              <br />
              <Editable
                text={name}
                onChange={(t) => setName(t)}
                render={(text) => <Typography variant="h6">{text}</Typography>}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
}
