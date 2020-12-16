export interface GetIssue {
  /** The ID or key of the requested issue. */
  issueIdOrKey: string;
  /** The list of fields to return for each issue. By default, all navigable and Agile fields are returned. */
  fields?: string[];
  /** A comma-separated list of the parameters to expand. */
  expand?: string;
  /** A boolean indicating whether the issue retrieved by this method should be added to the current user's issue history */
  updateHistory?: boolean;
}
