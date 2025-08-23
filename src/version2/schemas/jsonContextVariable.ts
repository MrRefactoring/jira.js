import { z } from 'zod';

/** A JSON object with custom content. */
export const JsonContextVariableSchema = z.object({
  /** Type of custom context variable. */
  type: z.string(),
  /** A JSON object containing custom content. */
  value: z.object({}).optional(),
});

export type JsonContextVariable = z.infer<typeof JsonContextVariableSchema>;
