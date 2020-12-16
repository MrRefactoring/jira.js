export interface DeleteActor {
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: string;
  /** The ID of the project role. Use [Get all project roles](#api-rest-api-2-role-get) to get a list of project role IDs. */
  id: number;
  /** The user account ID of the user to remove from the project role. */
  user?: string;
  /** The name of the group to remove from the project role. */
  group?: string;
}
