import { z } from 'zod';
import { JexpJqlIssuesSchema } from '#/models/jexpJqlIssues';

/** The JQL specifying the issues available in the evaluated Jira expression under the `issues` context variable. */
export const JexpIssuesSchema = z.object({
  jql: JexpJqlIssuesSchema.optional(),
});

export type JexpIssues = z.infer<typeof JexpIssuesSchema>;
