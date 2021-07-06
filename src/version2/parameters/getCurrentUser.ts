export interface GetCurrentUser {
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information about user in the response. Expand options include:
   *
   * - `groups` Returns all groups, including nested groups, the user belongs to.
   * - `applicationRoles` Returns the application roles the user is assigned to.
   */
  expand?: string | string[] | GetCurrentUser.Expand | GetCurrentUser.Expand[];
}

export namespace GetCurrentUser {
  export enum Expand {
    Groups = 'groups',
    ApplicationRoles = 'applicationRoles',
  }
}
