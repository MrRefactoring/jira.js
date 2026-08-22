import { z } from 'zod';

export const RestoreObjectSchema = z.object({
  /** The object identifier to restore. */
  objectIdentifier: z.string(),
});

export type RestoreObject = z.input<typeof RestoreObjectSchema>;
