import type { JiraExpressionEvaluateContext } from './jiraExpressionEvaluateContext';

export interface JiraExpressionEvalUsingEnhancedSearchRequest {
  /** The Jira expression to evaluate. */
  expression: string;
  /** The context in which the Jira expression is evaluated. */
  context?: JiraExpressionEvaluateContext;
}
