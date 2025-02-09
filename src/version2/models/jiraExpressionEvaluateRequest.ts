import { JiraExpressionEvaluateContextBean } from './jiraExpressionEvaluateContextBean';

/**
 * The request to evaluate a Jira expression. This bean will be replacing `JiraExpressionEvaluateRequest` as part of new
 * `evaluate` endpoint
 */
export interface JiraExpressionEvaluateRequest {
  context?: JiraExpressionEvaluateContextBean;
  /** The Jira expression to evaluate. */
  expression: string;
}
