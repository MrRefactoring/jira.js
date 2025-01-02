import { JiraExpressionEvalContext } from './jiraExpressionEvalContext.mjs';

export interface JiraExpressionEvalRequest {
  context?: JiraExpressionEvalContext;
  /** The Jira expression to evaluate. */
  expression: string;
}
