import { JiraExpressionsComplexityBean } from './jiraExpressionsComplexityBean';
import { JExpEvaluateIssuesMetaBean } from './jExpEvaluateIssuesMetaBean';

/** Contains information about the expression evaluation. */
export interface EvaluateMetaData {
  complexity?: JiraExpressionsComplexityBean;
  issues?: JExpEvaluateIssuesMetaBean;
}
