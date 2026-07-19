import type { z } from 'zod';
import { apiObject } from '#/core';
import { JexpJqlIssuesSchema } from './jexpJqlIssues';
/** The JQL specifying the issues available in the evaluated Jira expression under the `issues` context variable. */

export const JexpIssuesSchema = apiObject({
  jql: JexpJqlIssuesSchema.optional(),
});

export type JexpIssues = z.infer<typeof JexpIssuesSchema>;
