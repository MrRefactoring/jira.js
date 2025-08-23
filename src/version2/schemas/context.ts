import { z } from 'zod';

/** A context. */
export const ContextSchema = z.object({
  /** The ID of the context. */
  id: z.number().int().optional(),
  /** The name of the context. */
  name: z.string().optional(),
  /** The scope of the context. */
  scope: z.unknown().optional(),
});

export type Context = z.infer<typeof ContextSchema>;
