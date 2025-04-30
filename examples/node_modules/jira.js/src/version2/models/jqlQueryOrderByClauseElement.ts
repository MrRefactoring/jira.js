import type { JqlQueryField } from './jqlQueryField';

/** An element of the order-by JQL clause. */
export interface JqlQueryOrderByClauseElement {
  /** The direction in which to order the results. */
  direction?: string;
  field: JqlQueryField;
}
