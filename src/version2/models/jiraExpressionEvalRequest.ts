import { JiraExpressionEvalContext } from './jiraExpressionEvalContext';

/** @deprecated Use {@link JiraExpressionEvalRequest} instead. */
export type JiraExpressionEvalRequestBean = JiraExpressionEvalRequest;

export interface JiraExpressionEvalRequest {
  context?: JiraExpressionEvalContext;
  /** The Jira expression to evaluate. */
  expression: string;
}
