import { pageSchema, type Page } from './page';
import { CustomFieldContextOptionSchema, type CustomFieldContextOption } from './customFieldContextOption';

export const PageCustomFieldContextOptionSchema = pageSchema(CustomFieldContextOptionSchema);

/**
 * @deprecated Use `Page<CustomFieldContextOption>`, which describes the same shape. This alias is removed in the next
 *   major version.
 */
export type PageCustomFieldContextOption = Page<CustomFieldContextOption>;
