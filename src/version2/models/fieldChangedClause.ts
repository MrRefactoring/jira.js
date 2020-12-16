import { JqlQueryField } from './jqlQueryField';
import { JqlQueryClauseTimePredicate } from './jqlQueryClauseTimePredicate';

/**
 * A clause that asserts whether a field was changed. For example, `status CHANGED AFTER startOfMonth(-1M)`.See [CHANGED](https://confluence.atlassian.com/x/dgiiLQ#Advancedsearching-operatorsreference-CHANGEDCHANGED) for more information about the CHANGED operator. */
export interface FieldChangedClause {
  field: JqlQueryField;
  /** The operator applied to the field. */
  operator: string;
  /** The list of time predicates. */
  predicates: JqlQueryClauseTimePredicate[];
}
