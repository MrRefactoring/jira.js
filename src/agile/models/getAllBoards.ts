import type { Board } from './board.js';

export interface GetAllBoards {
  isLast?: boolean;
  maxResults?: number;
  startAt?: number;
  total?: number;
  values: Board[];
}
