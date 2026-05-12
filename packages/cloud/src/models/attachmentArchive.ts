import { z } from 'zod';
import { AttachmentArchiveEntrySchema } from '#/models/attachmentArchiveEntry';

export const AttachmentArchiveSchema = z.object({
  entries: z.array(AttachmentArchiveEntrySchema).optional(),
  moreAvailable: z.boolean().optional(),
  totalEntryCount: z.number().optional(),
  totalNumberOfEntriesAvailable: z.number().optional(),
});

export type AttachmentArchive = z.infer<typeof AttachmentArchiveSchema>;
