import type { z } from 'zod';
import { apiObject } from '#/core';
import { PagedAttachmentSchema } from './pagedAttachment';
import { CommentSchema } from './comment';

export const AttachmentCreateResultSchema = apiObject({
  attachments: PagedAttachmentSchema.optional(),
  comment: CommentSchema.optional(),
});

export type AttachmentCreateResult = z.infer<typeof AttachmentCreateResultSchema>;
