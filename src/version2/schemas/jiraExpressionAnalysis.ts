import { z } from 'zod';
import { JiraExpressionComplexitySchema } from './jiraExpressionComplexity';
import { JiraExpressionValidationErrorSchema } from './jiraExpressionValidationError';

/** Details about the analysed Jira expression. */
export const JiraExpressionAnalysisSchema = z.object({
  complexity: JiraExpressionComplexitySchema.optional(),
  /** A list of validation errors. Not included if the expression is valid. */
  errors: z.array(JiraExpressionValidationErrorSchema).optional(),
  /** The analysed expression. */
  expression: z.string(),
  /** EXPERIMENTAL. The inferred type of the expression. */
  type: z.string().optional(),
  /**
   * Whether the expression is valid and the interpreter will evaluate it. Note that the expression may fail at runtime
   * (for example, if it executes too many expensive operations).
   */
  valid: z.boolean(),
});

export type JiraExpressionAnalysis = z.infer<typeof JiraExpressionAnalysisSchema>;
