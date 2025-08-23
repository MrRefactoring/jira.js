import { z } from 'zod';
import { JqlQueryFieldSchema } from './jqlQueryField';
import { JqlQueryClauseOperandSchema } from './jqlQueryClauseOperand';

/** A clause that asserts the current value of a field. For example, `summary ~ test`. */
export const FieldValueClauseSchema = z.object({
  field: JqlQueryFieldSchema,
  operand: JqlQueryClauseOperandSchema,
  /** The operator between the field and operand. */
  operator: z.enum(['=', '!=', '>', '<', '>=', '<=', 'in', 'not in', '~', '~=', 'is', 'is not']),
});

export type FieldValueClause = z.infer<typeof FieldValueClauseSchema>;
