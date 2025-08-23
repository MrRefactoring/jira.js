import { z } from 'zod';

/**
 * The request to evaluate a Jira expression. This bean will be replacing `JiraExpressionEvaluateRequest` as part of new
 * `evaluate` endpoint
 */
export const JiraExpressionEvaluateRequestBeanSchema = z.object({
  /** The context in which the Jira expression is evaluated. */
  context: z.unknown().optional(),
  /** The Jira expression to evaluate. */
  expression: z.string(),
});

export type JiraExpressionEvaluateRequestBean = z.infer<typeof JiraExpressionEvaluateRequestBeanSchema>;
