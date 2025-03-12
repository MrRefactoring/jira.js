import type { JqlQuery } from './jqlQuery';

/** Details of a parsed JQL query. */
export interface ParsedJqlQuery {
  /** The list of syntax or validation errors. */
  errors?: string[];
  /** The JQL query that was parsed and validated. */
  query: string;
  structure?: JqlQuery;
}
