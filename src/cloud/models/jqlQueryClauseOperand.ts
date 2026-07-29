import { z } from 'zod';
import { ListOperandSchema } from './listOperand';
import { ValueOperandSchema } from './valueOperand';
import { FunctionOperandSchema } from './functionOperand';
import { KeywordOperandSchema } from './keywordOperand';
/** Details of an operand in a JQL clause. */

export const JqlQueryClauseOperandSchema = z.union([
  ListOperandSchema,
  ValueOperandSchema,
  FunctionOperandSchema,
  KeywordOperandSchema,
]);

export type JqlQueryClauseOperand = z.infer<typeof JqlQueryClauseOperandSchema>;
