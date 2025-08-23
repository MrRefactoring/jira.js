import { z } from 'zod';
import { JqlQueryToSanitizeSchema } from './jqlQueryToSanitize';

export const SanitiseJqlQueriesParametersSchema = z.object({
  /** The list of JQL queries to sanitize. Must contain unique values. Maximum of 20 queries. */
  queries: z.array(JqlQueryToSanitizeSchema),
});

export type SanitiseJqlQueriesParameters = z.infer<typeof SanitiseJqlQueriesParametersSchema>;
