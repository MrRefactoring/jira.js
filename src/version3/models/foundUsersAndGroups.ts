import type { FoundGroups } from './foundGroups.js';
import type { FoundUsers } from './foundUsers.js';

/** List of users and groups found in a search. */
export interface FoundUsersAndGroups {
  users?: FoundUsers;
  groups?: FoundGroups;
}
