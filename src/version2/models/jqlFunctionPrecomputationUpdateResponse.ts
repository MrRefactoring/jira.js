/** Result of updating JQL Function precomputations. */
export interface JqlFunctionPrecomputationUpdateResponse {
  /**
   * List of precomputations that were not found and skipped. Only returned if the request passed
   * skipNotFoundPrecomputations=true.
   */
  notFoundPrecomputationIDs?: string[];
}
