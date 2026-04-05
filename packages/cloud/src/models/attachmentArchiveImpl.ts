import { z } from 'zod';
import { AttachmentArchiveEntrySchema } from '#/models/attachmentArchiveEntry';

export const AttachmentArchiveImplSchema = z.object({
  /** The list of the items included in the archive. */
  entries: z.array(AttachmentArchiveEntrySchema).optional(),
  /** The number of items in the archive. */
  totalEntryCount: z.number().optional(),
});

export type AttachmentArchiveImpl = z.infer<typeof AttachmentArchiveImplSchema>;
