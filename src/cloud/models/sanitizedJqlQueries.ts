import { z } from 'zod';
import { apiObject } from '#/core';
import { SanitizedJqlQuerySchema } from './sanitizedJqlQuery';
/** The sanitized JQL queries for the given account IDs. */

export const SanitizedJqlQueriesSchema = apiObject({
  /** The list of sanitized JQL queries. */
  queries: z.array(SanitizedJqlQuerySchema).optional(),
});

export type SanitizedJqlQueries = z.infer<typeof SanitizedJqlQueriesSchema>;
