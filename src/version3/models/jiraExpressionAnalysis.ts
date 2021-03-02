import { JiraExpressionValidationError } from './jiraExpressionValidationError';
import { JiraExpressionComplexity } from './jiraExpressionComplexity';

/**
 * Details about the analysed Jira expression. */
export interface JiraExpressionAnalysis {
  /** The analysed expression. */
  expression: string;
  /** A list of validation errors. Not included if the expression is valid. */
  errors?: JiraExpressionValidationError[];
  /** Whether the expression is valid and the interpreter will evaluate it. Note that the expression may fail at runtime (for example, if it executes too many expensive operations). */
  valid: boolean;
  /** EXPERIMENTAL. The inferred type of the expression. */
  type?: string;
  complexity?: JiraExpressionComplexity;
}
