import { pageSchema, type Page } from './page';
import { StatusJsonSchema, type StatusJson } from './statusJson';

export const PageStatusJsonSchema = pageSchema(StatusJsonSchema);

/** @deprecated Use `Page<StatusJson>`, which describes the same shape. This alias is removed in the next major version. */
export type PageStatusJson = Page<StatusJson>;
