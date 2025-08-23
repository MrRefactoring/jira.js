import { z } from 'zod';

export const JiraExpressionEvalRequestBeanSchema = z.object({
  /** The context in which the Jira expression is evaluated. */
  context: z.unknown().optional(),
  /** The Jira expression to evaluate. */
  expression: z.string(),
});

export type JiraExpressionEvalRequestBean = z.infer<typeof JiraExpressionEvalRequestBeanSchema>;
