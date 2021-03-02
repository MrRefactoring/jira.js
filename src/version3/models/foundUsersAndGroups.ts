import { FoundUsers } from './foundUsers';
import { FoundGroups } from './foundGroups';

/**
 * List of users and groups found in a search. */
export interface FoundUsersAndGroups {
  users?: FoundUsers;
  groups?: FoundGroups;
}
