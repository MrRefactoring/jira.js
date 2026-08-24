import { z } from 'zod';
import { apiObject } from '#/core';

export const AttachmentMetaSchema = apiObject({
  enabled: z.boolean().optional(),
  /** Upload limit in bytes */
  uploadLimit: z.number().optional(),
});

export type AttachmentMeta = z.infer<typeof AttachmentMetaSchema>;
