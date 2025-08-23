import { z } from 'zod';
import { AttachmentArchiveEntrySchema } from './attachmentArchiveEntry';

export const AttachmentArchiveSchema = z.object({
  entries: z.array(AttachmentArchiveEntrySchema).optional(),
  moreAvailable: z.boolean().optional(),
  totalEntryCount: z.number().int().optional(),
  totalNumberOfEntriesAvailable: z.number().int().optional(),
});

export type AttachmentArchive = z.infer<typeof AttachmentArchiveSchema>;
