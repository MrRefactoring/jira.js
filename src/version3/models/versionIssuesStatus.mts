/** Counts of the number of issues in various statuses. */
export interface VersionIssuesStatus {
  /** Count of issues with a status other than _to do_, _in progress_, and _done_. */
  unmapped?: number;
  /** Count of issues with status _to do_. */
  toDo?: number;
  /** Count of issues with status _in progress_. */
  inProgress?: number;
  /** Count of issues with status _done_. */
  done?: number;
}
