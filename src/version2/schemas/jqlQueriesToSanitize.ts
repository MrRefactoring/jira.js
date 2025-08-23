import { z } from 'zod';
import { JqlQueryToSanitizeSchema } from './jqlQueryToSanitize';

/** The list of JQL queries to sanitize for the given account IDs. */
export const JqlQueriesToSanitizeSchema = z.object({
  /** The list of JQL queries to sanitize. Must contain unique values. Maximum of 20 queries. */
  queries: z.array(JqlQueryToSanitizeSchema),
});

export type JqlQueriesToSanitize = z.infer<typeof JqlQueriesToSanitizeSchema>;
