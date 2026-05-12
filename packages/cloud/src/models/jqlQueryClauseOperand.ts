import { z } from 'zod';

/** Details of an operand in a JQL clause. */
export const JqlQueryClauseOperandSchema = z.object({});

export type JqlQueryClauseOperand = z.infer<typeof JqlQueryClauseOperandSchema>;
