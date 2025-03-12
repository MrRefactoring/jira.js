import type { JqlQueryOrderByClause } from './jqlQueryOrderByClause';

/** A parsed JQL query. */
export interface JqlQuery {
  where?: object;
  orderBy?: JqlQueryOrderByClause;
}
