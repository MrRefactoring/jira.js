import type { JqlQuery } from './jqlQuery.js';

/** Details of a parsed JQL query. */
export interface ParsedJqlQuery {
  /** The JQL query that was parsed and validated. */
  query: string;
  structure?: JqlQuery;
  /** The list of syntax or validation errors. */
  errors?: string[];
}
