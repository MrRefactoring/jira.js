export interface GetNotificationScheme {
  /**
   * The ID of the notification scheme. Use [Get notification schemes paginated](#api-rest-api-3-notificationscheme-get)
   * to get a list of notification scheme IDs.
   */
  id: number;
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#expansion) to include additional
   * information in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * `all` Returns all expandable information. `field` Returns information about any custom fields assigned to receive
   * an event. `group` Returns information about any groups assigned to receive an event. `notificationSchemeEvents`
   * Returns a list of event associations. This list is returned for all expandable information. `projectRole` Returns
   * information about any project roles assigned to receive an event. `user` Returns information about any users
   * assigned to receive an event.
   */
  expand?: string;
}
