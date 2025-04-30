export interface DeleteProjectRoleActorsFromRole {
  /**
   * The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role
   * IDs.
   */
  id: number;
  /** The user account ID of the user to remove as a default actor. */
  user?: string;
  /**
   * The group ID of the group to be removed as a default actor. This parameter cannot be used with the `group`
   * parameter.
   */
  groupId?: string;
  /**
   * The group name of the group to be removed as a default actor.This parameter cannot be used with the `groupId`
   * parameter. As a group's name can change, use of `groupId` is recommended.
   */
  group?: string;
}
