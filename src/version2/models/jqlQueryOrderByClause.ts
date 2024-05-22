import type { JqlQueryOrderByClauseElement } from './jqlQueryOrderByClauseElement.js';

/** Details of the order-by JQL clause. */
export interface JqlQueryOrderByClause {
  /** The list of order-by clause fields and their ordering directives. */
  fields: JqlQueryOrderByClauseElement[];
}
