import { z } from 'zod';
import { ParsedJqlQuerySchema } from '#/models/parsedJqlQuery';

/** A list of parsed JQL queries. */
export const ParsedJqlQueriesSchema = z.object({
  /** A list of parsed JQL queries. */
  queries: z.array(ParsedJqlQuerySchema),
});

export type ParsedJqlQueries = z.infer<typeof ParsedJqlQueriesSchema>;
