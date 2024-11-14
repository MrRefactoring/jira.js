import type { CustomFieldContextUpdateDetails } from '../models/index.js';

export interface UpdateCustomFieldContext extends CustomFieldContextUpdateDetails {
  /** The ID of the custom field. */
  fieldId: string;
  /** The ID of the context. */
  contextId: number;
}
