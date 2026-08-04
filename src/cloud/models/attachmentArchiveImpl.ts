import { z } from 'zod';
import { apiObject } from '#/core';
import { AttachmentArchiveEntrySchema } from './attachmentArchiveEntry';

export const AttachmentArchiveImplSchema = apiObject({
  /** The list of the items included in the archive. */
  entries: z.array(AttachmentArchiveEntrySchema).optional(),
  /** The number of items in the archive. */
  totalEntryCount: z.number().optional(),
});

export type AttachmentArchiveImpl = z.infer<typeof AttachmentArchiveImplSchema>;
