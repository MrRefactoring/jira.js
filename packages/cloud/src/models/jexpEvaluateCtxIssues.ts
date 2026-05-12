import { z } from 'zod';
import { JexpEvaluateCtxJqlIssuesSchema } from '#/models/jexpEvaluateCtxJqlIssues';

/**
 * The JQL specifying the issues available in the evaluated Jira expression under the `issues` context variable. This
 * bean will be replacing `JexpIssues` bean as part of new `evaluate` endpoint
 */
export const JexpEvaluateCtxIssuesSchema = z.object({
  jql: JexpEvaluateCtxJqlIssuesSchema.optional(),
});

export type JexpEvaluateCtxIssues = z.infer<typeof JexpEvaluateCtxIssuesSchema>;
