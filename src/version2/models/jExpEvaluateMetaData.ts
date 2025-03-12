import type { JExpEvaluateIssuesMeta } from './jExpEvaluateIssuesMeta';
import type { JiraExpressionsComplexity } from './jiraExpressionsComplexity';

export interface JExpEvaluateMetaData {
  /**
   * Contains information about the expression complexity. For example, the number of steps it took to evaluate the
   * expression.
   */
  complexity?: JiraExpressionsComplexity;
  /**
   * Contains information about the `issues` variable in the context. For example, is the issues were loaded with JQL,
   * information about the page will be included here.
   */
  issues?: JExpEvaluateIssuesMeta;
}
