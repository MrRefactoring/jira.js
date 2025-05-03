import type { Worklog } from './worklog';

/** Paginated list of worklog details */
export interface PageOfWorklogs {
  /** The maximum number of results that could be on the page. */
  maxResults: number;
  /** The index of the first item returned on the page. */
  startAt: number;
  /** The number of results on the page. */
  total: number;
  /** List of worklogs. */
  worklogs: Worklog[];
}
