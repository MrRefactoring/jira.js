import { User } from './user';

export interface UserList {
  size: number;
  items: User[];
  'max-results': number;
  'start-index': number;
  'end-index': number;
}
