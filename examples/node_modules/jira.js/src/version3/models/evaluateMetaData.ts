import type { JiraExpressionsComplexity } from './jiraExpressionsComplexity';
import type { JExpEvaluateIssuesMeta } from './jExpEvaluateIssuesMeta';

/** Contains information about the expression evaluation. */
export interface EvaluateMetaData {
  complexity?: JiraExpressionsComplexity;
  issues?: JExpEvaluateIssuesMeta;
}
