import { JqlQueryField } from './jqlQueryField';

/** An element of the order-by JQL clause. */
export interface JqlQueryOrderByClauseElement {
  field: JqlQueryField;
  /** The direction in which to order the results. */
  direction?: string;
}
