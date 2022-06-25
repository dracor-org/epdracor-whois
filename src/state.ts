import { atomFamily } from 'recoil';
import { ParticDescItem } from './types';

export const particDescStateFamily = atomFamily({
  key: 'particDesc',
  default: [] as ParticDescItem[],
});
