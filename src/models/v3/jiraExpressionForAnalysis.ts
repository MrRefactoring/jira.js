export interface JiraExpressionForAnalysis {
  expressions: string[];
  contextVariables?: {
    [key: string]: unknown;
  };
}
