import { Board } from './board.mjs';

export interface GetAllBoards {
  isLast?: boolean;
  maxResults?: number;
  startAt?: number;
  total?: number;
  values: Board[];
}
