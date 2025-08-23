import { z } from 'zod';

/** The result of evaluating a Jira expression. */
export const JiraExpressionResultSchema = z.object({
  /** Contains various characteristics of the performed expression evaluation. */
  meta: z.unknown().optional(),
  /**
   * The value of the evaluated expression. It may be a primitive JSON value or a Jira REST API object. (Some
   * expressions do not produce any meaningful results—for example, an expression that returns a lambda function—if
   * that's the case a simple string representation is returned. These string representations should not be relied upon
   * and may change without notice.)
   */
  value: z.unknown(),
});

export type JiraExpressionResult = z.infer<typeof JiraExpressionResultSchema>;
