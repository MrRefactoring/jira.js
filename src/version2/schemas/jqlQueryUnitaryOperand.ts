import { z } from 'zod';

/** An operand that can be part of a list operand. */
export const JqlQueryUnitaryOperandSchema = z.object({});

export type JqlQueryUnitaryOperand = z.infer<typeof JqlQueryUnitaryOperandSchema>;
