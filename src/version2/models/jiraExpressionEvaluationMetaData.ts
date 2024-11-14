import type { IssuesMeta } from './issuesMeta.js';
import type { JiraExpressionsComplexity } from './jiraExpressionsComplexity.js';

export interface JiraExpressionEvaluationMetaData {
  complexity?: JiraExpressionsComplexity;
  issues?: IssuesMeta;
}
