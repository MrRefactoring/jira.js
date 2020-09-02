export interface JiraExpressionValidationError {
    line?: number;
    column?: number;
    expression?: string;
    message: string;
    type: string;
}