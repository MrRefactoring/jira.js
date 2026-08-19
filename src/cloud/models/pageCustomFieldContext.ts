import { pageSchema, type Page } from './page';
import { CustomFieldContextSchema, type CustomFieldContext } from './customFieldContext';

export const PageCustomFieldContextSchema = pageSchema(CustomFieldContextSchema);

/**
 * @deprecated Use `Page<CustomFieldContext>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PageCustomFieldContext = Page<CustomFieldContext>;
