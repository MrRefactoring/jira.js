export interface GetCreateIssueMetaIssueTypeId {
  /** The ID or key of the project. */
  projectIdOrKey: string;
  /** The issuetype ID. */
  issueTypeId: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
}
