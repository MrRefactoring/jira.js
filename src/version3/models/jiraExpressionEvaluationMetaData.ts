import { IssuesMeta } from './issuesMeta';
import { JiraExpressionsComplexity } from './jiraExpressionsComplexity';

export interface JiraExpressionEvaluationMetaData {
  complexity?: JiraExpressionsComplexity;
  issues?: IssuesMeta;
}
