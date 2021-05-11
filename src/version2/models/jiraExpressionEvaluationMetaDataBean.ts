import { JiraExpressionsComplexityBean } from './jiraExpressionsComplexityBean';
import { IssuesMetaBean } from './issuesMetaBean';

export interface JiraExpressionEvaluationMetaDataBean {
  complexity?: JiraExpressionsComplexityBean;
  issues?: IssuesMetaBean;
}
