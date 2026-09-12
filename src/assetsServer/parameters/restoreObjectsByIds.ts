import { z } from 'zod';

export const RestoreObjectsByIdsSchema = z.object({
  body: z.array(z.number()).optional(),
});

export type RestoreObjectsByIds = z.input<typeof RestoreObjectsByIdsSchema>;
