export interface RemoveGroup {
  /**
   * As a group's name can change, use of `groupId` is recommended to identify a group. The name of the group. This
   * parameter cannot be used with the `groupId` parameter.
   */
  groupname?: string;
  /**
   * The ID of the group. This parameter cannot be used with the `groupId` parameter. This parameter cannot be used with
   * the `groupName` parameter.
   */
  groupId?: string;
  /**
   * As a group's name can change, use of `swapGroupId` is recommended to identify a group. The group to transfer
   * restrictions to. Only comments and worklogs are transferred. If restrictions are not transferred, comments and
   * worklogs are inaccessible after the deletion. This parameter cannot be used with the `swapGroupId` parameter.
   */
  swapGroup?: string;
  /**
   * The ID of the group to transfer restrictions to. Only comments and worklogs are transferred. If restrictions are
   * not transferred, comments and worklogs are inaccessible after the deletion. This parameter cannot be used with the
   * `swapGroup` parameter.
   */
  swapGroupId?: string;
}
