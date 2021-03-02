import { UserPickerUser } from './userPickerUser';

/**
 * The list of users found in a search, including header text (Showing X of Y matching users) and total of matched users. */
export interface FoundUsers {
  users?: UserPickerUser[];
  /** The total number of users found in the search. */
  total?: number;
  /** Header text indicating the number of users in the response and the total number of users found in the search. */
  header?: string;
}
