import { JiraExpressionsComplexityBean } from './jiraExpressionsComplexityBean';
import { IssuesMetaBean } from './issuesMetaBean';

export interface JiraExpressionEvaluationMetaDataBean {
  /** Contains information about the expression complexity. For example, the number of steps it took to evaluate the expression. */
  complexity?: JiraExpressionsComplexityBean[];
  /** Contains information about the `issues` variable in the context. For example, is the issues were loaded with JQL, information about the page will be included here. */
  issues?: IssuesMetaBean[];
}
