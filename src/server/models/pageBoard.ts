import { pageSchema, type Page } from './page';
import { BoardSchema, type Board } from './board';

export const PageBoardSchema = pageSchema(BoardSchema);

/** @deprecated Use `Page<Board>`, which describes the same shape. This alias is removed in the next major version. */
export type PageBoard = Page<Board>;
