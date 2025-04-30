import type { JiraExpressionEvalContext } from './jiraExpressionEvalContext';

export interface JiraExpressionEvalRequest {
  context?: JiraExpressionEvalContext;
  /** The Jira expression to evaluate. */
  expression: string;
}
