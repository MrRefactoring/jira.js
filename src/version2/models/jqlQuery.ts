import type { JqlQueryOrderByClause } from './jqlQueryOrderByClause';

/** A parsed JQL query. */
export interface JqlQuery {
  orderBy?: JqlQueryOrderByClause;
  where?: object;
}
