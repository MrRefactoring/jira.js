export interface DeleteActor {
  /** The project ID or project key (case-sensitive). */
  projectIdOrKey: string | number;
  /**
   * The ID of the project role. Use [Get all project roles](#api-rest-api-2-role-get) to get a list of project role
   * IDs.
   */
  id: number;
  /** The user account ID of the user to remove from the project role. */
  user?: string;
  /**
   * The name of the group to remove from the project role. This parameter cannot be used with the `groupId` parameter.
   * As a group's name can change, use of `groupId` is recommended.
   */
  group?: string;
  /** The ID of the group to remove from the project role. This parameter cannot be used with the `group` parameter. */
  groupId?: string;
}
