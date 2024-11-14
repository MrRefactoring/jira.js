import type { UpdateCustomFieldDetails } from '../models/index.js';

export interface UpdateCustomField extends UpdateCustomFieldDetails {
  /** The ID of the custom field. */
  fieldId: string;
}
