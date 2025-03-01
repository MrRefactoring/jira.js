/** Error response returned updating JQL Function precomputations fails. */
export interface JqlFunctionPrecomputationUpdateErrorResponse {
  /** The list of error messages produced by this operation. */
  errorMessages?: string[];
  /** List of precomputations that were not found. */
  notFoundPrecomputationIDs?: string[];
}
