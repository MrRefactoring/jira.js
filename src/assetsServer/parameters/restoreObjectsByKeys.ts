import { z } from 'zod';

export const RestoreObjectsByKeysSchema = z.object({
  body: z.array(z.string()).optional(),
});

export type RestoreObjectsByKeys = z.input<typeof RestoreObjectsByKeysSchema>;
