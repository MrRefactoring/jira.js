import type { ErrorCollection } from './errorCollection';

/** Details of the sanitized JQL query. */
export interface SanitizedJqlQuery {
  /** The initial query. */
  initialQuery?: string;
  /** The sanitized query, if there were no errors. */
  sanitizedQuery?: string;
  errors?: ErrorCollection;
  /** The account ID of the user for whom sanitization was performed. */
  accountId?: string;
}
