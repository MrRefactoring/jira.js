import { JqlQueryToSanitize } from './jqlQueryToSanitize';

/** The list of JQL queries to sanitize for the given account IDs. */
export interface JqlQueriesToSanitize {
  /** The list of JQL queries to sanitize. Must contain unique values. Maximum of 20 queries. */
  queries: JqlQueryToSanitize[];
}
