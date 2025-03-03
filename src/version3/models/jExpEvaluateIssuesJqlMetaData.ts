/**
 * The description of the page of issues loaded by the provided JQL query.This bean will be replacing
 * IssuesJqlMetaDataBean bean as part of new `evaluate` endpoint
 */
export interface JExpEvaluateIssuesJqlMetaData {
  /** Next Page token for the next page of issues. */
  nextPageToken: string;
}
