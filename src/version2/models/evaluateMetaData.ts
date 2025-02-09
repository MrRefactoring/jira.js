import { JiraExpressionsComplexityBean } from './jiraExpressionsComplexityBean';
import { JExpEvaluateIssuesMetaBean } from './jExpEvaluateIssuesMetaBean';

/**
 * Contains information about the expression evaluation. This bean will be replacing
 * `JiraExpressionEvaluationMetaDataBean` bean as part of new `evaluate` endpoint
 */
export interface EvaluateMetaData {
  complexity?: JiraExpressionsComplexityBean;
  issues?: JExpEvaluateIssuesMetaBean;
}
