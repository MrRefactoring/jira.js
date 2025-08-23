import { z } from 'zod';

/**
 * The JQL specifying the issues available in the evaluated Jira expression under the `issues` context variable. Not all
 * issues returned by the JQL query are loaded, only those described by the `startAt` and `maxResults` properties. To
 * determine whether it is necessary to iterate to ensure all the issues returned by the JQL query are evaluated,
 * inspect `meta.issues.jql.count` in the response.
 */
export const JexpJqlIssuesSchema = z.object({
  /**
   * The maximum number of issues to return from the JQL query. Inspect `meta.issues.jql.maxResults` in the response to
   * ensure the maximum value has not been exceeded.
   */
  maxResults: z.number().int().optional(),
  /** The JQL query. */
  query: z.string().optional(),
  /** The index of the first issue to return from the JQL query. */
  startAt: z.number().int().optional(),
  /** Determines how to validate the JQL query and treat the validation results. */
  validation: z.enum(['strict', 'warn', 'none']).optional(),
});

export type JexpJqlIssues = z.infer<typeof JexpJqlIssuesSchema>;
