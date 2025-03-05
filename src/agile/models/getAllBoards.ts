import type { Board } from './board';

export interface GetAllBoards {
  isLast?: boolean;
  maxResults?: number;
  startAt?: number;
  total?: number;
  values: Board[];
}
