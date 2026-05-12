import { z } from 'zod';
import { ScopeSchema } from '#/models/scope';

/** A context. */
export const ContextSchema = z.object({
  /** The ID of the context. */
  id: z.number().optional(),
  /** The name of the context. */
  name: z.string().optional(),
  scope: ScopeSchema.optional(),
});

export type Context = z.infer<typeof ContextSchema>;
