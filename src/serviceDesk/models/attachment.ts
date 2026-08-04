import { z } from 'zod';
import { apiObject } from '#/core';
import { AttachmentLinkSchema } from './attachmentLink';
import { UserSchema } from './user';
import { DateSchema } from './date';

export const AttachmentSchema = apiObject({
  _links: AttachmentLinkSchema.optional(),
  author: UserSchema.optional(),
  created: DateSchema.optional(),
  /** Filename of the item attached. */
  filename: z.string().optional(),
  /** MIME type of the attachment. */
  mimeType: z.string().optional(),
  /** Size of the attachment in bytes. */
  size: z.number().optional(),
});

export type Attachment = z.infer<typeof AttachmentSchema>;
