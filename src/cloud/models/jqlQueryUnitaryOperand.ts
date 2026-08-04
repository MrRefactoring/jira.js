import { z } from 'zod';
import { ValueOperandSchema } from './valueOperand';
import { FunctionOperandSchema } from './functionOperand';
import { KeywordOperandSchema } from './keywordOperand';
/** An operand that can be part of a list operand. */

export const JqlQueryUnitaryOperandSchema = z.union([ValueOperandSchema, FunctionOperandSchema, KeywordOperandSchema]);

export type JqlQueryUnitaryOperand = z.infer<typeof JqlQueryUnitaryOperandSchema>;
