import { JqlQueryClauseOperand } from "./jqlQueryClauseOperand";
import { JqlQueryClauseTimePredicate } from "./jqlQueryClauseTimePredicate";
import { JqlQueryField } from "./jqlQueryField";

export interface FieldWasClause {
    field: JqlQueryField[];
    operator: string;
    operand: JqlQueryClauseOperand[];
    predicates: JqlQueryClauseTimePredicate[];
}