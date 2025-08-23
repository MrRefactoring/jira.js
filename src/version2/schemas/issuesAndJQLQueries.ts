import { z } from 'zod';

/** List of issues and JQL queries. */
export const IssuesAndJQLQueriesSchema = z.object({
  /** A list of issue IDs. */
  issueIds: z.array(z.number().int()),
  /** A list of JQL queries. */
  jqls: z.array(z.string()),
});

export type IssuesAndJQLQueries = z.infer<typeof IssuesAndJQLQueriesSchema>;
