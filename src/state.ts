import { atomFamily, selectorFamily } from 'recoil';
import { ParticDescItem, Speech } from './types';

// see https://github.com/facebookexperimental/Recoil/issues/629#issuecomment-797000984
type SelectorMapper<Type> = {
  [Property in keyof Type]: Type[Property];
};

export const particDescStateFamily = atomFamily({
  key: 'ParticDesc',
  default: [] as ParticDescItem[],
});

export const speechesStateFamily = atomFamily({
  key: 'Speeches',
  default: [] as Speech[],
});

export const uniqueSpeakersQuery = selectorFamily<string[], string>({
  key: 'UniqueSpeakers',
  get:
    (playId) =>
    ({ get }) => {
      const speeches = get(speechesStateFamily(playId));
      return speeches
        .map((s) => s.speaker || '')
        .filter((s, i, self) => s !== '' && self.indexOf(s) === i);
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
