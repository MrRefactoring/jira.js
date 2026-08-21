import { z } from 'zod';
import { apiObject } from '#/core';
/** An attachment as the upload reports it, whose `created` is a timestamp rather than a date. */

export const UploadedAttachmentSchema = apiObject({
  id: z.number().optional(),
  author: z.string().optional(),
  mimeType: z.string().optional(),
  filename: z.string().optional(),
  filesize: z.string().optional(),
  /** When the attachment was stored, as whole seconds since the epoch and the nanoseconds after them. */
  created: apiObject({
    seconds: z.number().optional(),
    nanos: z.number().optional(),
  }).optional(),
  comment: z.string().optional(),
  commentOutput: z.string().optional(),
  url: z.string().optional(),
});

export type UploadedAttachment = z.infer<typeof UploadedAttachmentSchema>;
