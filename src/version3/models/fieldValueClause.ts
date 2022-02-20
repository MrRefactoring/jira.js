import { JqlQueryClauseOperand } from './jqlQueryClauseOperand';
import { JqlQueryField } from './jqlQueryField';

/** A clause that asserts the current value of a field. For example, `summary ~ test`. */
export interface FieldValueClause {
  field: JqlQueryField;
  /** The operator between the field and operand. */
  operator: string;
  operand: JqlQueryClauseOperand;
}
