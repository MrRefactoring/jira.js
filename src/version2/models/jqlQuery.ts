import type { JqlQueryClause } from './jqlQueryClause.js';
import type { JqlQueryOrderByClause } from './jqlQueryOrderByClause.js';

/** A parsed JQL query. */
export interface JqlQuery {
  orderBy?: JqlQueryOrderByClause;
  where?: JqlQueryClause;
}
