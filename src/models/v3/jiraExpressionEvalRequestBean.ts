import { JiraExpressionEvalContextBean } from "./jiraExpressionEvalContextBean";

export interface JiraExpressionEvalRequestBean {
    expression: string;
    context?: JiraExpressionEvalContextBean[];
}