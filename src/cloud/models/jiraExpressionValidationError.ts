import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/**
 * Details about syntax and type errors. The error details apply to the entire expression, unless the object includes:*
 *
 * `line` and `column`* `expression`
 */

export const JiraExpressionValidationErrorSchema = apiObject({
  /** The text column in which the error occurred. */
  column: z.number().optional(),
  /** The part of the expression in which the error occurred. */
  expression: z.string().optional(),
  /** The text line in which the error occurred. */
  line: z.number().optional(),
  /** Details about the error. */
  message: z.string(),
  /** The error type. */
  type: openEnum(['syntax', 'type', 'other']),
});

export type JiraExpressionValidationError = z.infer<typeof JiraExpressionValidationErrorSchema>;
