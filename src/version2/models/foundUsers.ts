import type { UserPickerUser } from './userPickerUser';

/**
 * The list of users found in a search, including header text (Showing X of Y matching users) and total of matched
 * users.
 */
export interface FoundUsers {
  /** Header text indicating the number of users in the response and the total number of users found in the search. */
  header?: string;
  /** The total number of users found in the search. */
  total?: number;
  users?: UserPickerUser[];
}
