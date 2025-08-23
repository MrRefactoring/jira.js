import { z } from 'zod';

/** The JQL specifying the issues available in the evaluated Jira expression under the `issues` context variable. */
export const JexpIssuesSchema = z.object({
  /** The JQL query that specifies the set of issues available in the Jira expression. */
  jql: z.unknown().optional(),
});

export type JexpIssues = z.infer<typeof JexpIssuesSchema>;
