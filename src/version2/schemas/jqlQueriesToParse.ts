import { z } from 'zod';

/** A list of JQL queries to parse. */
export const JqlQueriesToParseSchema = z.object({
  /** A list of queries to parse. */
  queries: z.array(z.string()),
});

export type JqlQueriesToParse = z.infer<typeof JqlQueriesToParseSchema>;
