import { z } from 'zod';

export const ArchiveObjectsByIdsSchema = z.object({
  body: z.string().optional(),
});

export type ArchiveObjectsByIds = z.input<typeof ArchiveObjectsByIdsSchema>;
