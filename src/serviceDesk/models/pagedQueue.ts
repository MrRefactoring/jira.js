import { pageSchema, type Page } from './page';
import { QueueSchema, type Queue } from './queue';

export const PagedQueueSchema = pageSchema(QueueSchema);

/** @deprecated Use `Page<Queue>`, which describes the same shape. This alias is removed in the next major version. */
export type PagedQueue = Page<Queue>;
