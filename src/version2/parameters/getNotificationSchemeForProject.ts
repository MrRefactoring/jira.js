export interface GetNotificationSchemeForProject {
  /** The project ID or project key (case sensitive). */
  projectKeyOrId: string;
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * - `all` Returns all expandable information
   * - `field` Returns information about any custom fields assigned to receive an event
   * - `group` Returns information about any groups assigned to receive an event
   * - `notificationSchemeEvents` Returns a list of event associations. This list is returned for all expandable
   *   information
   * - `projectRole` Returns information about any project roles assigned to receive an event
   * - `user` Returns information about any users assigned to receive an event
   */
  expand?:
    | 'all'
    | 'field'
    | 'group'
    | 'notificationSchemeEvents'
    | 'projectRole'
    | 'user'
    | ('all' | 'field' | 'group' | 'notificationSchemeEvents' | 'projectRole' | 'user')[]
    | string
    | string[];
}
