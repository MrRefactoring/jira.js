import { z } from 'zod';

/**
 * The JQL specifying the issues available in the evaluated Jira expression under the `issues` context variable. This
 * bean will be replacing `JexpIssues` bean as part of new `evaluate` endpoint
 */
export const JexpEvaluateCtxIssuesSchema = z.object({
  /** The JQL query that specifies the set of issues available in the Jira expression. */
  jql: z.unknown().optional(),
});

export type JexpEvaluateCtxIssues = z.infer<typeof JexpEvaluateCtxIssuesSchema>;
