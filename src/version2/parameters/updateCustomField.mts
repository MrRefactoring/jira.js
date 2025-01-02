import { UpdateCustomFieldDetails } from '../models/index.mjs';

export interface UpdateCustomField extends UpdateCustomFieldDetails {
  /** The ID of the custom field. */
  fieldId: string;
}
