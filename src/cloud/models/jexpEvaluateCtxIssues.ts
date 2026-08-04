import type { z } from 'zod';
import { apiObject } from '#/core';
import { JexpEvaluateCtxJqlIssuesSchema } from './jexpEvaluateCtxJqlIssues';
/**
 * The JQL specifying the issues available in the evaluated Jira expression under the `issues` context variable. This
 * bean will be replacing `JexpIssues` bean as part of new `evaluate` endpoint
 */

export const JexpEvaluateCtxIssuesSchema = apiObject({
  jql: JexpEvaluateCtxJqlIssuesSchema.optional(),
});

export type JexpEvaluateCtxIssues = z.infer<typeof JexpEvaluateCtxIssuesSchema>;
