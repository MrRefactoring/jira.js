import { pageSchema, type Page } from './page';
import {
  CustomFieldContextDefaultValueSchema,
  type CustomFieldContextDefaultValue,
} from './customFieldContextDefaultValue';

export const PageCustomFieldContextDefaultValueSchema = pageSchema(CustomFieldContextDefaultValueSchema);

/**
 * @deprecated Use `Page<CustomFieldContextDefaultValue>`, which describes the same shape. This alias is removed in the
 *   next major version.
 */
export type PageCustomFieldContextDefaultValue = Page<CustomFieldContextDefaultValue>;
