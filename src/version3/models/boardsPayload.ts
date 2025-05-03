import type { BoardPayload } from './boardPayload';

export interface BoardsPayload {
  /** The boards to be associated with the project. */
  boards?: BoardPayload[];
}
