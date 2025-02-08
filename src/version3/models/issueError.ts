/** Describes the error that occurred when retrieving data for a particular issue. */
export interface IssueError {
  /** The error that occurred when fetching this issue. */
  errorMessage?: string;
  /** The ID of the issue. */
  id?: string;
}
