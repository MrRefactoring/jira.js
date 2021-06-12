export interface GetCurrentUser {
  /**
   * Use [expand](#expansion) to include additional information about user in the response. This parameter accepts a
   * comma-separated list. Expand options include:
   *
   * `groups` Returns all groups, including nested groups, the user belongs to. `applicationRoles` Returns the
   * application roles the user is assigned to.
   */
  expand?: string;
}
