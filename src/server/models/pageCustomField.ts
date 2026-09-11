import { pageSchema, type Page } from './page';
import { CustomFieldSchema, type CustomField } from './customField';

export const PageCustomFieldSchema = pageSchema(CustomFieldSchema);

/** @deprecated Use `Page<CustomField>`, which describes the same shape. This alias is removed in the next major version. */
export type PageCustomField = Page<CustomField>;
