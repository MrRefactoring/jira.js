import { z } from 'zod';
import { AttachmentCreateSchema } from '../models';

export const CreateCommentWithAttachmentSchema = z.object(AttachmentCreateSchema.shape).extend({
  /** The ID or key of the customer request to which the attachment will be added. */
  issueIdOrKey: z.string(),
});

export type CreateCommentWithAttachment = z.input<typeof CreateCommentWithAttachmentSchema>;
