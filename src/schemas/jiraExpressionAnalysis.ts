import { JiraExpressionValidationError } from './jiraExpressionValidationError';

export interface JiraExpressionAnalysis {
    expression: string;
    errors?: JiraExpressionValidationError[];
    valid: boolean;
}
