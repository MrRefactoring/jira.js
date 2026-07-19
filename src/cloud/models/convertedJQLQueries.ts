import { z } from 'zod';
import { apiObject } from '#/core';
import { JQLQueryWithUnknownUsersSchema } from './jqlQueryWithUnknownUsers';
/** The converted JQL queries. */

export const ConvertedJQLQueriesSchema = apiObject({
  /** List of queries containing user information that could not be mapped to an existing user */
  queriesWithUnknownUsers: z.array(JQLQueryWithUnknownUsersSchema).optional(),
  /** The list of converted query strings with account IDs in place of user identifiers. */
  queryStrings: z.array(z.string()).optional(),
});

export type ConvertedJQLQueries = z.infer<typeof ConvertedJQLQueriesSchema>;
