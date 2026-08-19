import { pageSchema, type Page } from './page';
import {
  CustomFieldContextProjectMappingSchema,
  type CustomFieldContextProjectMapping,
} from './customFieldContextProjectMapping';

export const PageCustomFieldContextProjectMappingSchema = pageSchema(CustomFieldContextProjectMappingSchema);

/**
 * @deprecated Use `Page<CustomFieldContextProjectMapping>`, which describes the same shape. This alias is removed in
 *   the next major version.
 */
export type PageCustomFieldContextProjectMapping = Page<CustomFieldContextProjectMapping>;
