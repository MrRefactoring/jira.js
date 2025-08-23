import { z } from 'zod';

export const ParseJqlQueriesParametersSchema = z.object({
  /**
   * How to validate the JQL query and treat the validation results. Validation options include:
   *
   * - `strict` Returns all errors. If validation fails, the query structure is not returned.
   * - `warn` Returns all errors. If validation fails but the JQL query is correctly formed, the query structure is
   *   returned.
   * - `none` No validation is performed. If JQL query is correctly formed, the query structure is returned.
   */
  validation: z.enum(['strict', 'warn', 'none']),
  /** A list of queries to parse. */
  queries: z.array(z.string()),
});

export type ParseJqlQueriesParameters = z.infer<typeof ParseJqlQueriesParametersSchema>;
