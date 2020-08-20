import { JqlQueryClause } from './jqlQueryClause';
import { JqlQueryOrderByClause } from './jqlQueryOrderByClause';

export interface JqlQuery {
    where: JqlQueryClause[];
    orderBy: JqlQueryOrderByClause[];
}
