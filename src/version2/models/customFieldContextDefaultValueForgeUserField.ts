import { UserFilter } from './userFilter';

/** Defaults for a Forge user custom field. */
export interface CustomFieldContextDefaultValueForgeUserField {
  /** The ID of the default user. */
  accountId: string;
  /** The ID of the context. */
  contextId: string;
  type: string;
  userFilter: UserFilter;
}
