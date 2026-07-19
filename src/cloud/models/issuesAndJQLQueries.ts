import { z } from 'zod';
import { apiObject } from '#/core';
/** List of issues and JQL queries. */

export const IssuesAndJQLQueriesSchema = apiObject({
  /** A list of issue IDs. */
  issueIds: z.array(z.number()),
  /** A list of JQL queries. */
  jqls: z.array(z.string()),
});

export type IssuesAndJQLQueries = z.infer<typeof IssuesAndJQLQueriesSchema>;
