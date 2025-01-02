import { JqlQueryOrderByClauseElement } from './jqlQueryOrderByClauseElement.mjs';

/** Details of the order-by Jql clause. */
export interface JqlQueryOrderByClause {
  /** The list of order-by clause fields and their ordering directives. */
  fields: JqlQueryOrderByClauseElement[];
}
