import type { JiraExpressionComplexity } from './jiraExpressionComplexity';
import type { JiraExpressionValidationError } from './jiraExpressionValidationError';

/** Details about the analysed Jira expression. */
export interface JiraExpressionAnalysis {
  complexity?: JiraExpressionComplexity;
  /** A list of validation errors. Not included if the expression is valid. */
  errors?: JiraExpressionValidationError[];
  /** The analysed expression. */
  expression: string;
  /** EXPERIMENTAL. The inferred type of the expression. */
  type?: string;
  /**
   * Whether the expression is valid and the interpreter will evaluate it. Note that the expression may fail at runtime
   * (for example, if it executes too many expensive operations).
   */
  valid: boolean;
}
