import { CustomFieldContextDefaultValueUpdate } from '../models/index.mjs';

export interface SetDefaultValues extends CustomFieldContextDefaultValueUpdate {
  /** The ID of the custom field. */
  fieldId: string;
}
