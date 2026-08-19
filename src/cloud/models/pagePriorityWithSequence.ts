import { pageSchema, type Page } from './page';
import { PriorityWithSequenceSchema, type PriorityWithSequence } from './priorityWithSequence';

export const PagePriorityWithSequenceSchema = pageSchema(PriorityWithSequenceSchema);

/**
 * @deprecated Use `Page<PriorityWithSequence>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PagePriorityWithSequence = Page<PriorityWithSequence>;
