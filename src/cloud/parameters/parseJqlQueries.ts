import { z } from 'zod';
import { JqlQueriesToParseSchema } from '../models';

export const ParseJqlQueriesSchema = z
  .object({
    /**
     * How to validate the JQL query and treat the validation results. Validation options include:
     *
     * - `strict` Returns all errors. If validation fails, the query structure is not returned.
     * - `warn` Returns all errors. If validation fails but the JQL query is correctly formed, the query structure is
     *   returned.
     * - `none` No validation is performed. If JQL query is correctly formed, the query structure is returned.
     */
    validation: z.enum(['strict', 'warn', 'none']),
  })
  .extend(JqlQueriesToParseSchema.shape);

export type ParseJqlQueries = z.input<typeof ParseJqlQueriesSchema>;
