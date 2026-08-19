import { pageSchema, type Page } from './page';
import { FieldConfigurationItemSchema, type FieldConfigurationItem } from './fieldConfigurationItem';

export const PageFieldConfigurationItemSchema = pageSchema(FieldConfigurationItemSchema);

/**
 * @deprecated Use `Page<FieldConfigurationItem>`, which describes the same shape. This alias is removed in the next
 *   major version.
 */
export type PageFieldConfigurationItem = Page<FieldConfigurationItem>;
