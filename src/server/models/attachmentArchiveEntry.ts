import { z } from 'zod';
import { apiObject } from '#/core';

export const AttachmentArchiveEntrySchema = apiObject({
  abbreviatedName: z.string().optional(),
  entryIndex: z.number().optional(),
  mediaType: z.string().optional(),
  name: z.string().optional(),
  size: z.number().optional(),
});

export type AttachmentArchiveEntry = z.infer<typeof AttachmentArchiveEntrySchema>;
