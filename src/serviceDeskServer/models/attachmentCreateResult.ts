import { z } from 'zod';
import { apiObject } from '#/core';
import { CommentSchema } from './comment';
import { AttachmentSchema } from './attachment';

export const AttachmentCreateResultSchema = apiObject({
  comment: CommentSchema.optional(),
  attachments: z.array(AttachmentSchema).optional(),
});

export type AttachmentCreateResult = z.infer<typeof AttachmentCreateResultSchema>;
