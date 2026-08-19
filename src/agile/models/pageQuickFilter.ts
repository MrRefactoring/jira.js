import { pageSchema, type Page } from './page';
import { QuickFilterSchema, type QuickFilter } from './quickFilter';

export const PageQuickFilterSchema = pageSchema(QuickFilterSchema);

/** @deprecated Use `Page<QuickFilter>`, which describes the same shape. This alias is removed in the next major version. */
export type PageQuickFilter = Page<QuickFilter>;
