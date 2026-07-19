import { z } from 'zod';
import { apiObject } from '#/core';

export const CustomContextVariableSchema = apiObject({
  /** Type of custom context variable. */
  type: z.string(),
});

export type CustomContextVariable = z.infer<typeof CustomContextVariableSchema>;
