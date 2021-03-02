import { UpdateUserToGroupBean } from '../models';

export interface AddUserToGroup extends UpdateUserToGroupBean {
  /** The name of the group (case sensitive). */
  groupname: string;
}
