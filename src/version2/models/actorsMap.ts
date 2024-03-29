export interface ActorsMap {
  /**
   * The name of the group to add. This parameter cannot be used with the `groupId` parameter. As a group's name can
   * change, use of `groupId` is recommended.
   */
  group?: string[];
  /** The ID of the group to add. This parameter cannot be used with the `group` parameter. */
  groupId?: string[];
  /** The user account ID of the user to add. */
  user?: string[];
}
