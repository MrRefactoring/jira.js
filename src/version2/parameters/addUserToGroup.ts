import { UpdateUserToGroup } from '../models';

export interface AddUserToGroup extends UpdateUserToGroup {
  /** The name of the group (case-sensitive). */
  groupname: string;
  groupId: string;
}
