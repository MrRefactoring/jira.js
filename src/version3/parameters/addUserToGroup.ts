import type { UpdateUserToGroup } from '../models';

export interface AddUserToGroup extends UpdateUserToGroup {
  /**
   * As a group's name can change, use of `groupId` is recommended to identify a group. The name of the group. This
   * parameter cannot be used with the `groupId` parameter.
   */
  groupname?: string;
  /** The ID of the group. This parameter cannot be used with the `groupName` parameter. */
  groupId?: string;
}
