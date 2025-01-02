import { JqlQueryToSanitize } from './jqlQueryToSanitize.mjs';

/** The list of Jql queries to sanitize for the given account IDs. */
export interface JqlQueriesToSanitize {
  /** The list of Jql queries to sanitize. Must contain unique values. Maximum of 20 queries. */
  queries: JqlQueryToSanitize[];
}
