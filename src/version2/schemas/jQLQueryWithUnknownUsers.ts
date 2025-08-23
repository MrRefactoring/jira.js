import { z } from 'zod';

/** JQL queries that contained users that could not be found */
export const JQLQueryWithUnknownUsersSchema = z.object({
  /** The converted query, with accountIDs instead of user identifiers, or 'unknown' for users that could not be found */
  convertedQuery: z.string().optional(),
  /** The original query, for reference */
  originalQuery: z.string().optional(),
});

export type JQLQueryWithUnknownUsers = z.infer<typeof JQLQueryWithUnknownUsersSchema>;
