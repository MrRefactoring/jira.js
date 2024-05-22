import type { CustomFieldContextDefaultValueUpdate } from '../models/index.js';

export interface SetDefaultValues extends CustomFieldContextDefaultValueUpdate {
  /** The ID of the custom field. */
  fieldId: string;
}
