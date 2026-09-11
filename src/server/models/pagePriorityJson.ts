import { pageSchema, type Page } from './page';
import { PriorityJsonSchema, type PriorityJson } from './priorityJson';

export const PagePriorityJsonSchema = pageSchema(PriorityJsonSchema);

/**
 * @deprecated Use `Page<PriorityJson>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PagePriorityJson = Page<PriorityJson>;
