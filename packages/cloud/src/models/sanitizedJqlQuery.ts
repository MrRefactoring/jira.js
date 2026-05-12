import { z } from 'zod';
import { ErrorCollectionSchema } from '#/models/errorCollection';

/** Details of the sanitized JQL query. */
export const SanitizedJqlQuerySchema = z.object({
  /** The account ID of the user for whom sanitization was performed. */
  accountId: z.string().max(128, 'accountId must be at most 128 characters').nullable().optional(),
  errors: ErrorCollectionSchema.optional(),
  /** The initial query. */
  initialQuery: z.string().optional(),
  /** The sanitized query, if there were no errors. */
  sanitizedQuery: z.string().nullable().optional(),
});

export type SanitizedJqlQuery = z.infer<typeof SanitizedJqlQuerySchema>;
