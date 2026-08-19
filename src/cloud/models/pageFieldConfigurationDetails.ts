import { pageSchema, type Page } from './page';
import { FieldConfigurationDetailsSchema, type FieldConfigurationDetails } from './fieldConfigurationDetails';

export const PageFieldConfigurationDetailsSchema = pageSchema(FieldConfigurationDetailsSchema);

/**
 * @deprecated Use `Page<FieldConfigurationDetails>`, which describes the same shape. This alias is removed in the next
 *   major version.
 */
export type PageFieldConfigurationDetails = Page<FieldConfigurationDetails>;
