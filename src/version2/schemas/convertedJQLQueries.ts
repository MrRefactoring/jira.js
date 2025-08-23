import { z } from 'zod';
import { JQLQueryWithUnknownUsersSchema } from './jQLQueryWithUnknownUsers';

/** The converted JQL queries. */
export const ConvertedJQLQueriesSchema = z.object({
  /** List of queries containing user information that could not be mapped to an existing user */
  queriesWithUnknownUsers: z.array(JQLQueryWithUnknownUsersSchema).optional(),
  /** The list of converted query strings with account IDs in place of user identifiers. */
  queryStrings: z.array(z.string()).optional(),
});

export type ConvertedJQLQueries = z.infer<typeof ConvertedJQLQueriesSchema>;
