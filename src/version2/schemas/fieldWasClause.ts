import { z } from 'zod';
import { JqlQueryFieldSchema } from './jqlQueryField';
import { JqlQueryClauseOperandSchema } from './jqlQueryClauseOperand';
import { JqlQueryClauseTimePredicateSchema } from './jqlQueryClauseTimePredicate';

/**
 * A clause that asserts a previous value of a field. For example, `status WAS "Resolved" BY currentUser() BEFORE
 * "2019/02/02"`. See [WAS](https://confluence.atlassian.com/x/dgiiLQ#Advancedsearching-operatorsreference-WASWAS) for
 * more information about the WAS operator.
 */
export const FieldWasClauseSchema = z.object({
  field: JqlQueryFieldSchema,
  operand: JqlQueryClauseOperandSchema,
  /** The operator between the field and operand. */
  operator: z.enum(['was', 'was in', 'was not in', 'was not']),
  /** The list of time predicates. */
  predicates: z.array(JqlQueryClauseTimePredicateSchema),
});

export type FieldWasClause = z.infer<typeof FieldWasClauseSchema>;
