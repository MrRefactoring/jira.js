import { CustomFieldContextDefaultValueUpdate } from '../models';

export interface SetDefaultValues extends CustomFieldContextDefaultValueUpdate {
  /** The ID of the custom field. */
  fieldId: string;
}
