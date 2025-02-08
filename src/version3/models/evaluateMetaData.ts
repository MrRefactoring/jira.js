import { JiraExpressionsComplexity } from './jiraExpressionsComplexity';
import { JExpEvaluateIssuesMeta } from './jExpEvaluateIssuesMeta';

/** Contains information about the expression evaluation. */
export interface EvaluateMetaData {
  complexity?: JiraExpressionsComplexity;
  issues?: JExpEvaluateIssuesMeta;
}
