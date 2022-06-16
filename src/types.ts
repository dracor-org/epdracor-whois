export interface Play {
  id: string;
  authors: string[];
  title: string;
  hasDramatisPersonae: boolean;
  hasWho: boolean;
}

export type DramatisPersonaeItem = string[];

export interface DramatisPersonae {
  id: string; // div ID
  pb: string; // pb ID
  items: DramatisPersonaeItem[];
}

export interface Speech {
  id: string | null;
  pb: string | null;
  speaker: string | null;
  who: string | null;
}

export interface PlayInfo {
  id: string;
  authors: string[];
  title: string;
  hasDramatisPersonae: boolean;
  hasWho: boolean;
  dramatisPersonae: DramatisPersonae;
  speeches: Speech[];
}

export interface ParticDescItem {
  id: string;
  name: string;
  isGroup: boolean;
  sex?: 'MALE' | 'FEMALE' | 'UNKNOWN';
}
