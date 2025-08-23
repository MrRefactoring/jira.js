import { z } from 'zod';
import { JqlQueryUnitaryOperandSchema } from './jqlQueryUnitaryOperand';

/** An operand that is a list of values. */
export const ListOperandSchema = z.object({
  /** Encoded operand, which can be used directly in a JQL query. */
  encodedOperand: z.string().optional(),
  /** The list of operand values. */
  values: z.array(JqlQueryUnitaryOperandSchema),
});

export type ListOperand = z.infer<typeof ListOperandSchema>;
