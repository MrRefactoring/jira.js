import { JqlQueryField } from './jqlQueryField';
import { JqlQueryClauseOperand } from './jqlQueryClauseOperand';

/** A clause that asserts the current value of a field. For example, `summary ~ test`. */
export interface FieldValueClause {
  field: JqlQueryField;
  operand: JqlQueryClauseOperand;
  /** The operator between the field and operand. */
  operator: '=' | '!=' | '>' | '<' | '>=' | '<=' | 'in' | 'not in' | '~' | '~=' | 'is' | 'is not' | string;
}
