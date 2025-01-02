import { CustomFieldValueUpdateDetails } from '../models/index.mjs';

export interface UpdateCustomFieldValue extends CustomFieldValueUpdateDetails {
  /** The ID or key of the custom field. For example, `customfield_10010`. */
  fieldIdOrKey: string;
  /** Whether to generate a changelog for this update. */
  generateChangelog?: boolean;
}
