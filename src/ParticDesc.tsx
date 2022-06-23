import { useState } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
  Speech,
  DramatisPersonae,
  DramatisPersonaeItem,
  ParticDescItem,
} from './types';
import { extractName, guessSex, makeId } from './utils';
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

interface Props {
  dp: DramatisPersonae;
  speeches: Speech[];
}

export default function ParticDesc({ dp, speeches }: Props) {
  const [items, setItems] = useState<ParticDescItem[]>([]);

  function newFromDp() {
    setItems(fromDramatisPersonae(dp.items));
  }

  function addItem(item: ParticDescItem) {
    setItems([item, ...items]);
  }

  function removeItem(index: number) {
    setItems(items.filter((item, i) => i !== index));
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
      <DragDropContext onDragEnd={onDragEnd}>
        <ListContainer>
          <Droppable droppableId="particdesc">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((item, i) => (
                  <ParticDescItemCmp
                    key={item.id}
                    data={item}
                    index={i}
                    onDelete={() => removeItem(i)}
                  />
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
