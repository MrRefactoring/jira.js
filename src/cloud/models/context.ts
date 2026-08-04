import { z } from 'zod';
import { apiObject } from '#/core';
import { ScopeSchema } from './scope';
/** A context. */

export const ContextSchema = apiObject({
  /** The ID of the context. */
  id: z.number().optional(),
  /** The name of the context. */
  name: z.string().optional(),
  scope: ScopeSchema.optional(),
});

export type Context = z.infer<typeof ContextSchema>;
