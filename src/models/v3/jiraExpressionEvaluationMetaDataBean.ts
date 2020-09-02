import { IssuesMetaBean } from "./issuesMetaBean";
import { JiraExpressionsComplexityBean } from "./jiraExpressionsComplexityBean";

export interface JiraExpressionEvaluationMetaDataBean {
    complexity: JiraExpressionsComplexityBean[];
    issues: IssuesMetaBean[];
}