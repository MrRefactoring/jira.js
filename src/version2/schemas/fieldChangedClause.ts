import { z } from 'zod';
import { JqlQueryFieldSchema } from './jqlQueryField';
import { JqlQueryClauseTimePredicateSchema } from './jqlQueryClauseTimePredicate';

/**
 * A clause that asserts whether a field was changed. For example, `status CHANGED AFTER startOfMonth(-1M)`.See
 * [CHANGED](https://confluence.atlassian.com/x/dgiiLQ#Advancedsearching-operatorsreference-CHANGEDCHANGED) for more
 * information about the CHANGED operator.
 */
export const FieldChangedClauseSchema = z.object({
  field: JqlQueryFieldSchema,
  /** The operator applied to the field. */
  operator: z.enum(['changed']),
  /** The list of time predicates. */
  predicates: z.array(JqlQueryClauseTimePredicateSchema),
});

export type FieldChangedClause = z.infer<typeof FieldChangedClauseSchema>;
