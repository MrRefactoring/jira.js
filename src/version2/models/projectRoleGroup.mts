/** Details of the group associated with the role. */
export interface ProjectRoleGroup {
  /** The display name of the group. */
  displayName?: string;
  /** The ID of the group. */
  groupId?: string;
  /** The name of the group. As a group's name can change, use of `groupId` is recommended to identify the group. */
  name?: string;
}
