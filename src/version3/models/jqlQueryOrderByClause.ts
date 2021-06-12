import { JqlQueryOrderByClauseElement } from './jqlQueryOrderByClauseElement';

/** Details of the order-by JQL clause. */
export interface JqlQueryOrderByClause {
  /** The list of order-by clause fields and their ordering directives. */
  fields: JqlQueryOrderByClauseElement[];
}
