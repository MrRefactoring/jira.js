import { CustomFieldConfigurations } from '../models';

export interface UpdateCustomFieldConfiguration extends CustomFieldConfigurations {
  fieldIdOrKey: string;
}
