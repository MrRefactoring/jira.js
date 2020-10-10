import { GroupName } from './groupName';
import { User } from './user';

export interface FilterSubscription {
  id: number;
  user: User[];
  group: GroupName[];
}
