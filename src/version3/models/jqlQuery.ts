import { JqlQueryClause } from './jqlQueryClause';
import { JqlQueryOrderByClause } from './jqlQueryOrderByClause';

/** A parsed JQL query. */
export interface JqlQuery {
  where?: JqlQueryClause;
  orderBy?: JqlQueryOrderByClause;
}
