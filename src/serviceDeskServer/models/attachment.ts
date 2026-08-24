import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema } from './user';
import { DateSchema } from './date';
import { AttachmentLinkSchema } from './attachmentLink';

export const AttachmentSchema = apiObject({
  filename: z.string().optional(),
  author: UserSchema.optional(),
  created: DateSchema.optional(),
  size: z.number().optional(),
  mimeType: z.string().optional(),
  _links: AttachmentLinkSchema.optional(),
});

export type Attachment = z.infer<typeof AttachmentSchema>;
