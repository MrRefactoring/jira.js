import { z } from 'zod';

/** Details of a parsed JQL query. */
export const ParsedJqlQuerySchema = z.object({
  /** The list of syntax or validation errors. */
  errors: z.array(z.string()).optional(),
  /** The JQL query that was parsed and validated. */
  query: z.string(),
  /** The syntax tree of the query. Empty if the query was invalid. */
  structure: z.unknown().optional(),
  /** The list of warning messages */
  warnings: z.array(z.string()).optional(),
});

export type ParsedJqlQuery = z.infer<typeof ParsedJqlQuerySchema>;
