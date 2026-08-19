import { pageSchema, type Page } from './page';
import { FieldSchema, type Field } from './field';

export const PageFieldSchema = pageSchema(FieldSchema);

/** @deprecated Use `Page<Field>`, which describes the same shape. This alias is removed in the next major version. */
export type PageField = Page<Field>;
