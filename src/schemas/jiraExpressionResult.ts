import { JiraExpressionEvaluationMetaDataBean } from './jiraExpressionEvaluationMetaDataBean';

export interface JiraExpressionResult {
    value: any;
    meta?: JiraExpressionEvaluationMetaDataBean[];
}
