import { z } from 'zod';

export const ArchiveObjectSchema = z.object({
  /** The object identifier to archive. */
  objectIdentifier: z.string(),
});

export type ArchiveObject = z.input<typeof ArchiveObjectSchema>;
