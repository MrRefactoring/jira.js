import { JiraExpressionsComplexity } from './jiraExpressionsComplexity';
import { IssuesMeta } from './issuesMeta';

/** @deprecated Use JiraExpressionEvaluationMetaData instead. */
export type JiraExpressionEvaluationMetaDataBean = JiraExpressionEvaluationMetaData;

export interface JiraExpressionEvaluationMetaData {
  complexity?: JiraExpressionsComplexity;
  issues?: IssuesMeta;
}
