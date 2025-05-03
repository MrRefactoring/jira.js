import type { JiraExpressionEvalContext } from './jiraExpressionEvalContext';

export interface JiraExpressionEvalRequest {
  /** The Jira expression to evaluate. */
  expression: string;
  context?: JiraExpressionEvalContext;
}
