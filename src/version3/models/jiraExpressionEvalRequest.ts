import type { JiraExpressionEvalContext } from './jiraExpressionEvalContext.js';

export interface JiraExpressionEvalRequest {
  /** The Jira expression to evaluate. */
  expression: string;
  context?: JiraExpressionEvalContext;
}
