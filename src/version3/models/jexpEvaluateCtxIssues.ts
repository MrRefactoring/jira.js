import type { JexpEvaluateCtxJqlIssues } from './jexpEvaluateCtxJqlIssues';

/**
 * The JQL specifying the issues available in the evaluated Jira expression under the `issues` context variable. This
 * bean will be replacing `JexpIssues` bean as part of new `evaluate` endpoint
 */
export interface JexpEvaluateCtxIssues {
  jql?: JexpEvaluateCtxJqlIssues;
}
