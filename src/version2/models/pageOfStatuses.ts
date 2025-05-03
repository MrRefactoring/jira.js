import type { JiraStatus } from './jiraStatus';

export interface PageOfStatuses {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** The URL of the next page of results, if any. */
  nextPage?: string;
  /** The URL of this page. */
  self?: string;
  /** The index of the first item returned on the page. */
  startAt?: number;
  /** Number of items that satisfy the search. */
  total?: number;
  /** The list of items. */
  values?: JiraStatus[];
}
