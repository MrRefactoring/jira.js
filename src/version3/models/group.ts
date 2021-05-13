import { PagedListUserDetailsApplicationUser } from './pagedListUserDetailsApplicationUser';

export interface Group {
  /** The name of group. */
  name?: string;
  /** The URL for these group details. */
  self?: string;
  users?: PagedListUserDetailsApplicationUser;
  /** Expand options that include additional group details in the response. */
  expand?: string;
}
