import { z } from 'zod';
import { apiObject } from '#/core';
/** A JSON object with custom content. */

export const JsonContextVariableSchema = apiObject({
  /** Type of custom context variable. */
  type: z.enum(['json']),
  /** A JSON object containing custom content. */
  value: z.record(z.string(), z.any()).optional(),
});

export type JsonContextVariable = z.infer<typeof JsonContextVariableSchema>;
