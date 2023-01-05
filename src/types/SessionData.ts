import { VocabList } from './VocabList.ts';

export interface SessionData {
  vocabList: VocabList;
}

export const initialData = (): SessionData => ({
  vocabList: {
    entries: [],
  },
});
