import type { z } from 'zod';
import { apiObject } from '#/core';
/** Details of an operand in a JQL clause. */

export const JqlQueryClauseOperandSchema = apiObject({});

export type JqlQueryClauseOperand = z.infer<typeof JqlQueryClauseOperandSchema>;
