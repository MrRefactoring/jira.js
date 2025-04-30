import type { CustomFieldConfigurations } from '../models';

export interface UpdateCustomFieldConfiguration extends CustomFieldConfigurations {
  /** The ID or key of the custom field, for example `customfield_10000`. */
  fieldIdOrKey: string;
}
