import { JqlQueriesToParse } from '../models/index.mjs';

export interface ParseJqlQueries extends JqlQueriesToParse {
  /**
   * How to validate the Jql query and treat the validation results. Validation options include:
   *
   * - `strict` Returns all errors. If validation fails, the query structure is not returned.
   * - `warn` Returns all errors. If validation fails but the Jql query is correctly formed, the query structure is
   *   returned.
   * - `none` No validation is performed. If Jql query is correctly formed, the query structure is returned.
   */
  validation?: 'strict' | 'warn' | 'none' | string;
}
