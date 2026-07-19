import { z } from 'zod';
import { apiObject } from '#/core';
import { ParsedJqlQuerySchema } from './parsedJqlQuery';
/** A list of parsed JQL queries. */

export const ParsedJqlQueriesSchema = apiObject({
  /** A list of parsed JQL queries. */
  queries: z.array(ParsedJqlQuerySchema),
});

export type ParsedJqlQueries = z.infer<typeof ParsedJqlQueriesSchema>;
