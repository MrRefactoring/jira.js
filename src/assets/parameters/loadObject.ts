import { z } from 'zod';

export const LoadObjectSchema = z.object({
  /** The object id to operate on */
  id: z.string(),
});

export type LoadObject = z.input<typeof LoadObjectSchema>;
