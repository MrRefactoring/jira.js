import { pageSchema, type Page } from './page';
import {
  FieldConfigurationSchemeProjectsSchema,
  type FieldConfigurationSchemeProjects,
} from './fieldConfigurationSchemeProjects';

export const PageFieldConfigurationSchemeProjectsSchema = pageSchema(FieldConfigurationSchemeProjectsSchema);

/**
 * @deprecated Use `Page<FieldConfigurationSchemeProjects>`, which describes the same shape. This alias is removed in
 *   the next major version.
 */
export type PageFieldConfigurationSchemeProjects = Page<FieldConfigurationSchemeProjects>;
