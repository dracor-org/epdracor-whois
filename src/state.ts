import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { ParticDescItem, Speech } from './types';

// see https://github.com/facebookexperimental/Recoil/issues/629#issuecomment-797000984
type SelectorMapper<Type> = {
  [Property in keyof Type]: Type[Property];
};

export const currentPlayIdState = atom({
  key: 'CurrentPlayId',
  default: null as string | null,
});

export const particDescStateFamily = atomFamily({
  key: 'ParticDesc',
  default: [] as ParticDescItem[],
});

export const speechesStateFamily = atomFamily({
  key: 'Speeches',
  default: [] as Speech[],
});

export const selectParticDescIds = selector<string[]>({
  key: 'ParticDescIds',
  get: ({ get }) => {
    const playId = get(currentPlayIdState);
    if (playId) {
      const particDesc = get(particDescStateFamily(playId));
      return particDesc.map((item) => item.id);
    }
    return [];
  },
});

export const selectUniqueSpeakers = selector<string[]>({
  key: 'UniqueSpeakers',
  get: ({ get }) => {
    const playId = get(currentPlayIdState);
    if (playId) {
      const speeches = get(speechesStateFamily(playId));
      return speeches
        .map((s) => s.speaker || '')
        .filter((s, i, self) => s !== '' && self.indexOf(s) === i);
    }
    return [];
  },
});

interface SpeakerQuery {
  playId: string;
  speaker: string;
}

export const speechesBySpeakerQuery = selectorFamily<
  Speech[],
  SelectorMapper<SpeakerQuery>
>({
  key: 'SpeechesBySpeaker',
  get:
    ({ playId, speaker }) =>
    ({ get }) => {
      const speeches = get(speechesStateFamily(playId));
      return speeches.filter((s) => s.speaker === speaker);
    },
});
