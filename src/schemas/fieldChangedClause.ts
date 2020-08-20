import { JqlQueryClauseTimePredicate } from './jqlQueryClauseTimePredicate';
import { JqlQueryField } from './jqlQueryField';

export interface FieldChangedClause {
    field: JqlQueryField[];
    operator: string;
    predicates: JqlQueryClauseTimePredicate[];
}
