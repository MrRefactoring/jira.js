import { JqlQueryClauseOperand } from './jqlQueryClauseOperand';

/** A time predicate for a temporal JQL clause. */
export interface JqlQueryClauseTimePredicate {
  /** The operator between the field and the operand. */
  operator: string;
  operand: JqlQueryClauseOperand;
}
