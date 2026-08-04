import { z } from 'zod';
import { apiObject } from '#/core';
/** A list of JQL queries to parse. */

export const JqlQueriesToParseSchema = apiObject({
  /** A list of queries to parse. */
  queries: z.array(z.string()),
});

export type JqlQueriesToParse = z.infer<typeof JqlQueriesToParseSchema>;
