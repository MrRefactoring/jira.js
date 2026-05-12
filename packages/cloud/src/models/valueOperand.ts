import { z } from 'zod';

/** An operand that is a user-provided value. */
export const ValueOperandSchema = z.object({
  /** Encoded value, which can be used directly in a JQL query. */
  encodedValue: z.string().optional(),
  /** The operand value. */
  value: z.string(),
});

export type ValueOperand = z.infer<typeof ValueOperandSchema>;
