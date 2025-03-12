import type { FoundGroups } from './foundGroups';
import type { FoundUsers } from './foundUsers';

/** List of users and groups found in a search. */
export interface FoundUsersAndGroups {
  groups?: FoundGroups;
  users?: FoundUsers;
}
