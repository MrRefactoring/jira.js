import { z } from 'zod';

export const LoadObjectTypeSchema = z.object({
  /** The ID of the object type to retrieve. */
  id: z.string(),
});

export type LoadObjectType = z.input<typeof LoadObjectTypeSchema>;
