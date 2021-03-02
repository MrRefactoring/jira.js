export interface DeleteProjectRoleActorsFromRole {
  /** The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs. */
  id: number;
  /** The user account ID of the user to remove as a default actor. */
  user?: string;
  /** The group name of the group to be removed as a default actor. */
  group?: string;
}
