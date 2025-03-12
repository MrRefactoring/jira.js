import type { JiraExpressionEvalRequest } from '../models';

export interface EvaluateJiraExpression extends JiraExpressionEvalRequest {
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#expansion) to include additional
   * information in the response. This parameter accepts `meta.complexity` that returns information about the expression
   * complexity. For example, the number of expensive operations used by the expression and how close the expression is
   * to reaching the [complexity
   * limit](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#restrictions). Useful when designing
   * and debugging your expressions.
   */
  expand?: 'meta.complexity' | string;
}
