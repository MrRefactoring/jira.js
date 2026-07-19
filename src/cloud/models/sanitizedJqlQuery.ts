import { z } from 'zod';
import { apiObject } from '#/core';
import { ErrorCollectionSchema } from './errorCollection';
/** Details of the sanitized JQL query. */

export const SanitizedJqlQuerySchema = apiObject({
  /** The account ID of the user for whom sanitization was performed. */
  accountId: z.string().max(128, 'accountId must be at most 128 characters').nullish(),
  errors: ErrorCollectionSchema.optional(),
  /** The initial query. */
  initialQuery: z.string().optional(),
  /** The sanitized query, if there were no errors. */
  sanitizedQuery: z.string().nullish(),
});

export type SanitizedJqlQuery = z.infer<typeof SanitizedJqlQuerySchema>;
