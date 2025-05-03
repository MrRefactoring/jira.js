import type { JexpEvaluateCtxJqlIssues } from './jexpEvaluateCtxJqlIssues';

/** The JQL specifying the issues available in the evaluated Jira expression under the `issues` context variable. */
export interface JexpEvaluateCtxIssues {
  jql?: JexpEvaluateCtxJqlIssues;
}
