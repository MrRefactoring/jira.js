import type { JqlQueryClause } from './jqlQueryClause';
import type { JqlQueryOrderByClause } from './jqlQueryOrderByClause';

/** A parsed JQL query. */
export interface JqlQuery {
  orderBy?: JqlQueryOrderByClause;
  where?: JqlQueryClause;
}
