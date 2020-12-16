/**
 * Counts of the number of issues in various statuses. */
export interface VersionIssuesStatus {
  /** Count of issues with a status other than *to do*, *in progress*, and *done*. */
  unmapped?: number;
  /** Count of issues with status *to do*. */
  toDo?: number;
  /** Count of issues with status *in progress*. */
  inProgress?: number;
  /** Count of issues with status *done*. */
  done?: number;
}
