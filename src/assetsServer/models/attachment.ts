import { z } from 'zod';
import { apiObject } from '#/core';

export const AttachmentSchema = apiObject({
  id: z.number().optional(),
  author: z.string().optional(),
  mimeType: z.string().optional(),
  filename: z.string().optional(),
  filesize: z.string().optional(),
  created: z.coerce.date().optional(),
  comment: z.string().optional(),
  commentOutput: z.string().optional(),
  url: z.string().optional(),
});

export type Attachment = z.infer<typeof AttachmentSchema>;
