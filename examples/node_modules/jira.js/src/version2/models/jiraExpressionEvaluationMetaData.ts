import type { IssuesMeta } from './issuesMeta';
import type { JiraExpressionsComplexity } from './jiraExpressionsComplexity';

export interface JiraExpressionEvaluationMetaData {
  complexity?: JiraExpressionsComplexity;
  issues?: IssuesMeta;
}
