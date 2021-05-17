import { JexpJqlIssues } from './jexpJqlIssues';

/**
 * The JQL specifying the issues available in the evaluated Jira expression under the `issues` context variable. */
export interface JexpIssues {
  jql?: JexpJqlIssues;
}
