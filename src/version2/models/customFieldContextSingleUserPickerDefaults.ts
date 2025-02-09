import { UserFilter } from './userFilter';

/** Defaults for a User Picker (single) custom field. */
export interface CustomFieldContextSingleUserPickerDefaults {
  /** The ID of the default user. */
  accountId: string;
  /** The ID of the context. */
  contextId: string;
  type: string;
  userFilter: UserFilter;
}
