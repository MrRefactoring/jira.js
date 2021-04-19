export interface GetNotificationSchemes {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:

   *  `all` Returns all expandable information.
   *  `field` Returns information about any custom fields assigned to receive an event.
   *  `group` Returns information about any groups assigned to receive an event.
   *  `notificationSchemeEvents` Returns a list of event associations. This list is returned for all expandable information.
   *  `projectRole` Returns information about any project roles assigned to receive an event.
   *  `user` Returns information about any users assigned to receive an event. */
  expand?: string;
}
