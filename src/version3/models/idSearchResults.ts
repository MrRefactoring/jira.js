/** Result of your JQL search. Returns a list of issue IDs and a token to fetch the next page if one exists. */
export interface IdSearchResults {
  /** The list of issue IDs found by the search. */
  issueIds?: number[];
  /**
   * Continuation token to fetch the next page. If this result represents the last or the only page this token will be
   * null.
   */
  nextPageToken?: string;
}
