export interface DeleteProjectRole {
  /**
   * The ID of the project role to delete. Use [Get all project roles](#api-rest-api-2-role-get) to get a list of
   * project role IDs.
   */
  id: number;
  /** The ID of the project role that will replace the one being deleted. */
  swap?: number;
}
