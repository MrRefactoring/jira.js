import { FoundGroups } from './foundGroups';
import { FoundUsers } from './foundUsers';

export interface FoundUsersAndGroups {
  users: FoundUsers[];
  groups: FoundGroups[];
}
