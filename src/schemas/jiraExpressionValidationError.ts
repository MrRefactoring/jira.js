export interface JiraExpressionValidationError {
    line?: number;
    column?: number;
    message: string;
    type: string;
}
