import type { FieldConfigurationItemsDetails } from '../models/index.js';

export interface UpdateFieldConfigurationItems extends FieldConfigurationItemsDetails {
  /** The ID of the field configuration. */
  id: number;
}
