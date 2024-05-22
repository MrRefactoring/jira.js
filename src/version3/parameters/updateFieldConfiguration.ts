import type { FieldConfigurationDetails } from '../models/index.js';

export interface UpdateFieldConfiguration extends FieldConfigurationDetails {
  /** The ID of the field configuration. */
  id: number;
}
