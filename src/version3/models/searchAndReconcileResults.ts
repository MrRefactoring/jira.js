import type { Issue } from './issue';

/** The result of a JQL search with issues reconsilation. */
export interface SearchAndReconcileResults {
  /** The list of issues found by the search or reconsiliation. */
  issues?: Issue[];
  /** The ID and name of each field in the search results. */
  names?: unknown;
  /**
   * Continuation token to fetch the next page. If this result represents the last or the only page this token will be
   * null. This token will expire in 7 days.
   */
  nextPageToken?: string;
  /** The schema describing the field types in the search results. */
  schema?: unknown;
}
