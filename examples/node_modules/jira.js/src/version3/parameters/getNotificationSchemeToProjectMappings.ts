export interface GetNotificationSchemeToProjectMappings {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** The list of notifications scheme IDs to be filtered out */
  notificationSchemeId?: string[];
  /** The list of project IDs to be filtered out */
  projectId?: string[];
}
