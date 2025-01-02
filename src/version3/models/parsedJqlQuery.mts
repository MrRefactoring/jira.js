import type { JqlQuery } from './jqlQuery.mjs';

/** Details of a parsed Jql query. */
export interface ParsedJqlQuery {
  /** The Jql query that was parsed and validated. */
  query: string;
  structure?: JqlQuery;
  /** The list of syntax or validation errors. */
  errors?: string[];
}
