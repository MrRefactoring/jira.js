import { JqlQueryField } from './jqlQueryField';
import { JqlQueryClauseOperand } from './jqlQueryClauseOperand';
import { JqlQueryClauseTimePredicate } from './jqlQueryClauseTimePredicate';

/**
 * A clause that asserts a previous value of a field. For example, `status WAS "Resolved" BY currentUser() BEFORE
 * "2019/02/02"`. See [WAS](https://confluence.atlassian.com/x/dgiiLQ#Advancedsearching-operatorsreference-WASWAS) for
 * more information about the WAS operator.
 */
export interface FieldWasClause {
  field: JqlQueryField;
  operand: JqlQueryClauseOperand;
  /** The operator between the field and operand. */
  operator: 'was' | 'was in' | 'was not in' | 'was not' | string;
  /** The list of time predicates. */
  predicates: JqlQueryClauseTimePredicate[];
}
