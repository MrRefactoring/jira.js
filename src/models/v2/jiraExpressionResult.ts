import { JiraExpressionEvaluationMetaDataBean } from "./jiraExpressionEvaluationMetaDataBean";

export interface JiraExpressionResult {
    value: unknown;
    meta?: JiraExpressionEvaluationMetaDataBean[];
}