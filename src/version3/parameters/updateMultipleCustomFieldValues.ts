import type { MultipleCustomFieldValuesUpdateDetails } from '../models/index.js';

export interface UpdateMultipleCustomFieldValues extends MultipleCustomFieldValuesUpdateDetails {
  /** Whether to generate a changelog for this update. */
  generateChangelog?: boolean;
}
