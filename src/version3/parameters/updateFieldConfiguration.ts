import { FieldConfigurationDetails } from '../models';

export interface UpdateFieldConfiguration extends FieldConfigurationDetails {
  /** The ID of the field configuration. */
  id: number;
}
