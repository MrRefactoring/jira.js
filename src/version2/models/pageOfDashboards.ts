import type { Dashboard } from './dashboard';

/** A page containing dashboard details. */
export interface PageOfDashboards {
  /** List of dashboards. */
  dashboards?: Dashboard[];
  /** The maximum number of results that could be on the page. */
  maxResults?: number;
  /** The URL of the next page of results, if any. */
  next?: string;
  /** The URL of the previous page of results, if any. */
  prev?: string;
  /** The index of the first item returned on the page. */
  startAt?: number;
  /** The number of results on the page. */
  total?: number;
}
