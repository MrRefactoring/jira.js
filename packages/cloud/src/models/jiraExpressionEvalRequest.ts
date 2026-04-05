import { z } from 'zod';
import { JiraExpressionEvalContextSchema } from '#/models/jiraExpressionEvalContext';

export const JiraExpressionEvalRequestSchema = z.object({
  context: JiraExpressionEvalContextSchema.optional(),
  /** The Jira expression to evaluate. */
  expression: z.string(),
});

export type JiraExpressionEvalRequest = z.infer<typeof JiraExpressionEvalRequestSchema>;
