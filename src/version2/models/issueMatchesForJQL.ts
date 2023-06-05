/** A list of the issues matched to a JQL query or details of errors encountered during matching. */
export interface IssueMatchesForJQL {
  /** A list of errors. */
  errors: string[];
  /** A list of issue IDs. */
  matchedIssues: number[];
}
