import { z } from 'zod';
import { apiObject } from '#/core';
import { JiraExpressionEvaluateContextSchema } from './jiraExpressionEvaluateContext';
/**
 * The request to evaluate a Jira expression. This bean will be replacing `JiraExpressionEvaluateRequest` as part of new
 * `evaluate` endpoint
 */

export const JiraExpressionEvaluateRequestSchema = apiObject({
  context: JiraExpressionEvaluateContextSchema.optional(),
  /** The Jira expression to evaluate. */
  expression: z.string(),
});

export type JiraExpressionEvaluateRequest = z.infer<typeof JiraExpressionEvaluateRequestSchema>;
