import { IssuesMeta } from './issuesMeta.mjs';
import { JiraExpressionsComplexity } from './jiraExpressionsComplexity.mjs';

export interface JiraExpressionEvaluationMetaData {
  complexity?: JiraExpressionsComplexity;
  issues?: IssuesMeta;
}
