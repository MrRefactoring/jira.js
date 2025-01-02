import { FieldConfigurationItemsDetails } from '../models/index.mjs';

export interface UpdateFieldConfigurationItems extends FieldConfigurationItemsDetails {
  /** The ID of the field configuration. */
  id: number;
}
