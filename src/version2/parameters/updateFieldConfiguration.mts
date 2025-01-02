import { FieldConfigurationDetails } from '../models/index.mjs';

export interface UpdateFieldConfiguration extends FieldConfigurationDetails {
  /** The ID of the field configuration. */
  id: number;
}
