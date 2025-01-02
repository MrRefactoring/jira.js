import type { SanitizedJqlQuery } from './sanitizedJqlQuery.mjs';

/** The sanitized Jql queries for the given account IDs. */
export interface SanitizedJqlQueries {
  /** The list of sanitized Jql queries. */
  queries?: SanitizedJqlQuery[];
}
