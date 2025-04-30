import type { JExpEvaluateIssuesJqlMetaData } from './jExpEvaluateIssuesJqlMetaData';

/** Meta data describing the `issues` context variable. */
export interface JExpEvaluateIssuesMeta {
  /**
   * The description of the page of issues loaded by the provided JQL query. This bean will be replacing
   * IssuesJqlMetaDataBean bean as part of new `evaluate` endpoint
   */
  jql?: JExpEvaluateIssuesJqlMetaData;
}
