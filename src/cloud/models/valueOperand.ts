import { z } from 'zod';
import { apiObject } from '#/core';
/** An operand that is a user-provided value. */

export const ValueOperandSchema = apiObject({
  /** Encoded value, which can be used directly in a JQL query. */
  encodedValue: z.string().optional(),
  /** The operand value. */
  value: z.string(),
});

export type ValueOperand = z.infer<typeof ValueOperandSchema>;
