import { User } from './user';

/**
 * A paginated list of users sharing the filter. This includes users that are members of the groups or can browse the
 * projects that the filter is shared with.
 */
export interface UserList {
  /** The number of items on the page. */
  size?: number;
  /** The list of items. */
  items?: User[];
  /** The maximum number of results that could be on the page. */
  'max-results'?: number;
  /** The index of the first item returned on the page. */
  'start-index'?: number;
  /** The index of the last item returned on the page. */
  'end-index'?: number;
}
