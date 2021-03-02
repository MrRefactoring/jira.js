import { UpdateCustomFieldDetails } from '../models';

export interface UpdateCustomField extends UpdateCustomFieldDetails {
  /** The ID of the custom field. */
  fieldId: string;
}
