import { z } from 'zod';
import { JiraExpressionEvaluateContextSchema } from '#/models/jiraExpressionEvaluateContext';

/**
 * The request to evaluate a Jira expression. This bean will be replacing `JiraExpressionEvaluateRequest` as part of new
 * `evaluate` endpoint
 */
export const JiraExpressionEvaluateRequestSchema = z.object({
  context: JiraExpressionEvaluateContextSchema.optional(),
  /** The Jira expression to evaluate. */
  expression: z.string(),
});

export type JiraExpressionEvaluateRequest = z.infer<typeof JiraExpressionEvaluateRequestSchema>;
