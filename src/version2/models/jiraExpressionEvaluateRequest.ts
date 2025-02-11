import { JiraExpressionEvaluateContext } from './jiraExpressionEvaluateContext';

/**
 * The request to evaluate a Jira expression. This bean will be replacing `JiraExpressionEvaluateRequest` as part of new
 * `evaluate` endpoint
 */
export interface JiraExpressionEvaluateRequest {
  context?: JiraExpressionEvaluateContext;
  /** The Jira expression to evaluate. */
  expression: string;
}
