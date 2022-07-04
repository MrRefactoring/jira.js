import { IssuesMeta } from './issuesMeta';
import { JiraExpressionsComplexity } from './jiraExpressionsComplexity';

/** @deprecated Use {@link JiraExpressionEvaluationMetaData} instead. */
export type JiraExpressionEvaluationMetaDataBean = JiraExpressionEvaluationMetaData;

export interface JiraExpressionEvaluationMetaData {
  complexity?: JiraExpressionsComplexity;
  issues?: IssuesMeta;
}
