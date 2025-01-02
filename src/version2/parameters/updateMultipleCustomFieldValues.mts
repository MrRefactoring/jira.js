import { MultipleCustomFieldValuesUpdateDetails } from '../models/index.mjs';

export interface UpdateMultipleCustomFieldValues extends MultipleCustomFieldValuesUpdateDetails {
  /** Whether to generate a changelog for this update. */
  generateChangelog?: boolean;
}
