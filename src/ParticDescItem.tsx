import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
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
import ReplayIcon from '@mui/icons-material/Replay';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { ParticDescItem, Sex } from './types';
import { particDescStateFamily } from './state';
import Editable from './Editable';
import { makeId } from './utils';

interface Props {
  item: ParticDescItem;
}

export default function ParticDescItemCmp({ item }: Props) {
  const { id, name, isGroup, sex } = item;
  const { playId } = useParams();
  const [items, setItems] = useRecoilState(particDescStateFamily(playId));
  const index = items.findIndex((listItem) => listItem === item);

  function save(update: Partial<ParticDescItem>) {
    const newItems = replaceItemAtIndex(items, index, { ...item, ...update });
    setItems(newItems);
  }

  function cycleSex() {
    let newSex: Sex;
    switch (sex) {
      case 'FEMALE':
        newSex = 'MALE';
        break;
      case 'MALE':
        newSex = 'UNKNOWN';
        break;
      case 'UNKNOWN':
        newSex = undefined;
        break;
      default:
        newSex = 'FEMALE';
        break;
    }
    save({ sex: newSex });
  }

  function handleDelete() {
    const newItems = removeItemAtIndex(items, index);
    setItems(newItems);
  }

  const showReload = id !== makeId(name);

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
                <IconButton
                  onClick={() => save({ isGroup: !isGroup })}
                  size="small"
                >
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
              <IconButton onClick={handleDelete} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
              <Editable
                text={id}
                onChange={(newId) => save({ id: newId })}
                render={(text) => <Chip label={text} size="small" />}
              />
              {showReload && (
                <Tooltip title="Update ID">
                  <IconButton
                    size="small"
                    onClick={() => save({ id: makeId(name) })}
                  >
                    <ReplayIcon fontSize="small" sx={{ fontSize: 12 }} />
                  </IconButton>
                </Tooltip>
              )}
              <br />
              <Editable
                text={name}
                onChange={(newName) => save({ name: newName })}
                render={(text) => <Typography variant="h6">{text}</Typography>}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
}

function replaceItemAtIndex(
  arr: ParticDescItem[],
  index: number,
  newItem: ParticDescItem
) {
  return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr: ParticDescItem[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
