import type { JiraExpressionEvalContext } from './jiraExpressionEvalContext.js';

export interface JiraExpressionEvalRequest {
  context?: JiraExpressionEvalContext;
  /** The Jira expression to evaluate. */
  expression: string;
}
