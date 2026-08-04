import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { JqlQueryFieldSchema } from './jqlQueryField';
import { JqlQueryClauseOperandSchema } from './jqlQueryClauseOperand';
/** A clause that asserts the current value of a field. For example, `summary ~ test`. */

export const FieldValueClauseSchema = apiObject({
  field: JqlQueryFieldSchema,
  operand: JqlQueryClauseOperandSchema,
  /** The operator between the field and operand. */
  operator: openEnum(['=', '!=', '>', '<', '>=', '<=', 'in', 'not in', '~', '~=', 'is', 'is not']),
});

export type FieldValueClause = z.infer<typeof FieldValueClauseSchema>;
