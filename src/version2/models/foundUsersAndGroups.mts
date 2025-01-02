import { FoundGroups } from './foundGroups.mjs';
import { FoundUsers } from './foundUsers.mjs';

/** List of users and groups found in a search. */
export interface FoundUsersAndGroups {
  groups?: FoundGroups;
  users?: FoundUsers;
}
