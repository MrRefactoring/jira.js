import { z } from 'zod';

export const ArchiveObjectsByKeysSchema = z.object({
  /** The keys of the objects to archive. */
  body: z.array(z.string()).optional(),
});

export type ArchiveObjectsByKeys = z.input<typeof ArchiveObjectsByKeysSchema>;
