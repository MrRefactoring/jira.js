import { Worklog } from './worklog';

/** Paginated list of worklog details */
export interface PageOfWorklogs {
  /** The index of the first item returned on the page. */
  startAt?: number;
  /** The maximum number of results that could be on the page. */
  maxResults?: number;
  /** The number of results on the page. */
  total?: number;
  /** List of worklogs. */
  worklogs?: Worklog[];
}
