import { useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
  Speech,
  DramatisPersonae,
  DramatisPersonaeItem,
  ParticDescItem,
} from './types';
import { extractName, guessSex, makeId, stripEpId, idToName } from './utils';
import { particDescStateFamily, speechesStateFamily } from './state';
import { ListContainer } from './Layout';
import ParticDescItemCmp from './ParticDescItem';
import ParticDescItemAdder from './ParticDescItemAdder';

function fromDramatisPersonae(items: DramatisPersonaeItem[]): ParticDescItem[] {
  return items
    .filter((item) => item[0] !== '')
    .map((item) => {
      const name = extractName(item[0]);
      return {
        id: makeId(name),
        name,
        isGroup: false,
        sex: guessSex(name),
      };
    });
}

function fromWhoAttributes(speeches: Speech[]): ParticDescItem[] {
  return speeches
    .map((s) => s.who)
    .filter((who, i, self) => who && self.indexOf(who) === i)
    .map((who) => ({
      id: stripEpId(who || ''),
      name: idToName(who || ''),
      isGroup: false,
    }));
}

interface Props {
  dp: DramatisPersonae;
  speeches: Speech[];
}

export default function ParticDesc({ dp, speeches }: Props) {
  const { playId } = useParams();
  const [items, setItems] = useRecoilState(particDescStateFamily(playId));
  const setSpeehes = useSetRecoilState(speechesStateFamily(playId));

  function newFromDp() {
    setItems(fromDramatisPersonae(dp.items));
  }

  function newFromWho() {
    setItems(fromWhoAttributes(speeches));
    setSpeehes((oldSpeeches) =>
      oldSpeeches.map((s) => {
        if (s.who) {
          return { ...s, whos: [stripEpId(s.who)] };
        }
        return s;
      })
    );
  }

  function addItem(item: ParticDescItem) {
    setItems((prevItems) => [item, ...prevItems]);
  }

  function onDragEnd(result: DropResult) {
    const { destination, source } = result;
    if (!destination) {
      // not dropped
      return;
    }
    if (
      // postiton not changed
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const newItems = [...items];
    const item = newItems.splice(source.index, 1)[0];
    newItems.splice(destination.index, 0, item);
    setItems(newItems);
  }

  return (
    <>
      <Typography variant="h6" mb={2} sx={{ flexShrink: 0 }}>
        particDesc
      </Typography>
      <ParticDescItemAdder onAdd={addItem} />
      {items.length === 0 && dp.items.length > 0 && (
        <Button variant="outlined" onClick={newFromDp}>
          New from Dramatis Personae
        </Button>
      )}
      {items.length === 0 && speeches.some((s) => s.who) && (
        <Button variant="outlined" onClick={newFromWho} sx={{ marginTop: 1 }}>
          New from existing @who attributes
        </Button>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <ListContainer>
          <Droppable droppableId="particdesc">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((item) => (
                  <ParticDescItemCmp key={item.id} item={item} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ListContainer>
      </DragDropContext>
    </>
  );
}
