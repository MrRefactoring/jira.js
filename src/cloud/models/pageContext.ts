import { pageSchema, type Page } from './page';
import { ContextSchema, type Context } from './context';

export const PageContextSchema = pageSchema(ContextSchema);

/** @deprecated Use `Page<Context>`, which describes the same shape. This alias is removed in the next major version. */
export type PageContext = Page<Context>;
