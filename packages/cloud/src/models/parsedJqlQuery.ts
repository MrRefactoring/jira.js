import { z } from 'zod';
import { JqlQuerySchema } from '#/models/jqlQuery';

/** Details of a parsed JQL query. */
export const ParsedJqlQuerySchema = z.object({
  /** The list of syntax or validation errors. */
  errors: z.array(z.string()).optional(),
  /** The JQL query that was parsed and validated. */
  query: z.string(),
  structure: JqlQuerySchema.optional(),
  /** The list of warning messages */
  warnings: z.array(z.string()).optional(),
});

export type ParsedJqlQuery = z.infer<typeof ParsedJqlQuerySchema>;
