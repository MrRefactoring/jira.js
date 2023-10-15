import { Board } from './board';

export interface GetAllBoards {
  maxResults?: number;
  startAt?: number;
  total?: number;
  isLast?: boolean;
  values: Board[];
}
