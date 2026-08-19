import { pageSchema, type Page } from './page';
import { FieldConfigurationSchemeSchema, type FieldConfigurationScheme } from './fieldConfigurationScheme';

export const PageFieldConfigurationSchemeSchema = pageSchema(FieldConfigurationSchemeSchema);

/**
 * @deprecated Use `Page<FieldConfigurationScheme>`, which describes the same shape. This alias is removed in the next
 *   major version.
 */
export type PageFieldConfigurationScheme = Page<FieldConfigurationScheme>;
