import { JiraExpressionEvalContext } from './jiraExpressionEvalContext.mjs';

export interface JiraExpressionEvalRequest {
  /** The Jira expression to evaluate. */
  expression: string;
  context?: JiraExpressionEvalContext;
}
