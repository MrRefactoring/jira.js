import type { FieldConfigurationScheme } from './fieldConfigurationScheme.js';

/** Project list with assigned field configuration schema. */
export interface FieldConfigurationSchemeProjects {
  fieldConfigurationScheme?: FieldConfigurationScheme;
  /** The IDs of projects using the field configuration scheme. */
  projectIds: string[];
}
