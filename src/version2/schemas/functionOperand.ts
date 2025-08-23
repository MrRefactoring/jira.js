import { z } from 'zod';

/**
 * An operand that is a function. See [Advanced searching - functions
 * reference](https://confluence.atlassian.com/x/dwiiLQ) for more information about JQL functions.
 */
export const FunctionOperandSchema = z.object({
  /** The list of function arguments. */
  arguments: z.array(z.string()),
  /** Encoded operand, which can be used directly in a JQL query. */
  encodedOperand: z.string().optional(),
  /** The name of the function. */
  function: z.string(),
});

export type FunctionOperand = z.infer<typeof FunctionOperandSchema>;
