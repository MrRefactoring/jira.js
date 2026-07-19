import type { z } from 'zod';
import { apiObject } from '#/core';
/** An operand that can be part of a list operand. */

export const JqlQueryUnitaryOperandSchema = apiObject({});

export type JqlQueryUnitaryOperand = z.infer<typeof JqlQueryUnitaryOperandSchema>;
