import { useState } from 'react';
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
      <ListContainer>
        <>
          {items.map((item, i) => (
            <ParticDescItemCmp
              key={item.id}
              data={item}
              onDelete={() => removeItem(i)}
            />
          ))}
        </>
      </ListContainer>
    </>
  );
}
