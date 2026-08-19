import { pageSchema, type Page } from './page';
import { PrioritySchema, type Priority } from './priority';

export const PagePrioritySchema = pageSchema(PrioritySchema);

/** @deprecated Use `Page<Priority>`, which describes the same shape. This alias is removed in the next major version. */
export type PagePriority = Page<Priority>;
