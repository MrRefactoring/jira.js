import { JqlQueryField } from './jqlQueryField.mjs';

/** An element of the order-by Jql clause. */
export interface JqlQueryOrderByClauseElement {
  field: JqlQueryField;
  /** The direction in which to order the results. */
  direction?: string;
}
