import { JiraExpressionsComplexity } from './jiraExpressionsComplexity';
import { JExpEvaluateIssuesMeta } from './jExpEvaluateIssuesMeta';

/**
 * Contains information about the expression evaluation. This bean will be replacing
 * `JiraExpressionEvaluationMetaDataBean` bean as part of new `evaluate` endpoint
 */
export interface EvaluateMetaData {
  complexity?: JiraExpressionsComplexity;
  issues?: JExpEvaluateIssuesMeta;
}
