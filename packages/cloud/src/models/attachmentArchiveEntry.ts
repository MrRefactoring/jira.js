import { z } from 'zod';

export const AttachmentArchiveEntrySchema = z.object({
  abbreviatedName: z.string().optional(),
  entryIndex: z.number().optional(),
  mediaType: z.string().optional(),
  name: z.string().optional(),
  size: z.number().optional(),
});

export type AttachmentArchiveEntry = z.infer<typeof AttachmentArchiveEntrySchema>;
