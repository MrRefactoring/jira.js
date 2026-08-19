import { pageSchema, type Page } from './page';
import { BoardFilterSchema, type BoardFilter } from './boardFilter';

export const PageBoardFilterSchema = pageSchema(BoardFilterSchema);

/** @deprecated Use `Page<BoardFilter>`, which describes the same shape. This alias is removed in the next major version. */
export type PageBoardFilter = Page<BoardFilter>;
