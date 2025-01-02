import type { ErrorCollection } from './errorCollection.mjs';

/** Details of the sanitized Jql query. */
export interface SanitizedJqlQuery {
  /** The account ID of the user for whom sanitization was performed. */
  accountId?: string;
  errors?: ErrorCollection;
  /** The initial query. */
  initialQuery?: string;
  /** The sanitized query, if there were no errors. */
  sanitizedQuery?: string;
}
