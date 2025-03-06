import type { JExpEvaluateIssuesJqlMetaData } from './jExpEvaluateIssuesJqlMetaData';

/**
 * Meta data describing the `issues` context variable.This bean will be replacing IssuesMetaBean bean as part of new
 * `evaluate` endpoint
 */
export interface JExpEvaluateIssuesMeta {
  jql?: JExpEvaluateIssuesJqlMetaData;
}
