import { JqlQueryClause } from './jqlQueryClause.mjs';
import { JqlQueryOrderByClause } from './jqlQueryOrderByClause.mjs';

/** A parsed Jql query. */
export interface JqlQuery {
  where?: JqlQueryClause;
  orderBy?: JqlQueryOrderByClause;
}
