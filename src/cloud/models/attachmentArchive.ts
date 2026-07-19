import { z } from 'zod';
import { apiObject } from '#/core';
import { AttachmentArchiveEntrySchema } from './attachmentArchiveEntry';

export const AttachmentArchiveSchema = apiObject({
  entries: z.array(AttachmentArchiveEntrySchema).optional(),
  moreAvailable: z.boolean().optional(),
  totalEntryCount: z.number().optional(),
  totalNumberOfEntriesAvailable: z.number().optional(),
});

export type AttachmentArchive = z.infer<typeof AttachmentArchiveSchema>;
