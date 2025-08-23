import { z } from 'zod';

export const CustomContextVariableSchema = z.object({
  /** Type of custom context variable. */
  type: z.string(),
});

export type CustomContextVariable = z.infer<typeof CustomContextVariableSchema>;
