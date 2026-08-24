import { z } from 'zod';
import { apiObject } from '#/core';
import { AttachmentArchiveEntrySchema } from './attachmentArchiveEntry';

export const AttachmentArchiveImplSchema = apiObject({
  entries: z.array(AttachmentArchiveEntrySchema).optional(),
  /** Total number of entries available (can be larger that what was asked for) */
  totalEntryCount: z.number().optional(),
});

export type AttachmentArchiveImpl = z.infer<typeof AttachmentArchiveImplSchema>;
