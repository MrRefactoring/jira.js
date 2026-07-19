import { z } from 'zod';
import { apiObject } from '#/core';
import { JiraExpressionEvalContextSchema } from './jiraExpressionEvalContext';

export const JiraExpressionEvalRequestSchema = apiObject({
  context: JiraExpressionEvalContextSchema.optional(),
  /** The Jira expression to evaluate. */
  expression: z.string(),
});

export type JiraExpressionEvalRequest = z.infer<typeof JiraExpressionEvalRequestSchema>;
