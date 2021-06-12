import { JiraExpressionEvalRequestBean } from '../models';

export interface EvaluateJiraExpression extends JiraExpressionEvalRequestBean {
  /**
   * Use [expand](#expansion) to include additional information in the response. This parameter accepts
   * `meta.complexity` that returns information about the expression complexity. For example, the number of expensive
   * operations used by the expression and how close the expression is to reaching the [complexity
   * limit](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#restrictions). Useful when designing
   * and debugging your expressions.
   */
  expand?: string;
}
