import { z } from 'zod';
import { apiObject } from '#/core';
import { JqlQueryClauseOperandSchema } from './jqlQueryClauseOperand';
/** A time predicate for a temporal JQL clause. */

export const JqlQueryClauseTimePredicateSchema = apiObject({
  operand: JqlQueryClauseOperandSchema,
  /** The operator between the field and the operand. */
  operator: z.enum(['before', 'after', 'from', 'to', 'on', 'during', 'by']),
});

export type JqlQueryClauseTimePredicate = z.infer<typeof JqlQueryClauseTimePredicateSchema>;
