import { z } from 'zod';
import { apiObject } from '#/core';

/** List of issues and JQL queries. */
export const IssuesAndJQLQueriesSchema = apiObject({
  /** A list of up to 50 issue IDs. */
  issueIds: z.array(z.number()),
  /** A list of up to 10 JQL queries. */
  jqls: z.array(z.string()),
});

export type IssuesAndJQLQueries = z.infer<typeof IssuesAndJQLQueriesSchema>;
