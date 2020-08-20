import { JqlQueryClause } from './jqlQueryClause';

export interface CompoundClause {
    clauses: JqlQueryClause[];
    operator: string;
}
