import { JqlQueryClauseOperand } from "./jqlQueryClauseOperand";

export interface JqlQueryClauseTimePredicate {
    operator: string;
    operand: JqlQueryClauseOperand[];
}