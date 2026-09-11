import { pageSchema, type Page } from './page';
import { FieldMetaSchema, type FieldMeta } from './fieldMeta';

export const PageFieldMetaSchema = pageSchema(FieldMetaSchema);

/** @deprecated Use `Page<FieldMeta>`, which describes the same shape. This alias is removed in the next major version. */
export type PageFieldMeta = Page<FieldMeta>;
