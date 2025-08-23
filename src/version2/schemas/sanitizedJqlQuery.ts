import { z } from 'zod';

/** Details of the sanitized JQL query. */
export const SanitizedJqlQuerySchema = z.object({
  /** The account ID of the user for whom sanitization was performed. */
  accountId: z.string().optional(),
  /** The list of errors. */
  errors: z.unknown().optional(),
  /** The initial query. */
  initialQuery: z.string().optional(),
  /** The sanitized query, if there were no errors. */
  sanitizedQuery: z.string().optional(),
});

export type SanitizedJqlQuery = z.infer<typeof SanitizedJqlQuerySchema>;
