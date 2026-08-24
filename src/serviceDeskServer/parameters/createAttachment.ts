import { z } from 'zod';
import { AttachmentCreateSchema } from '../models';

export const CreateAttachmentSchema = z.object(AttachmentCreateSchema.shape).extend({
  /** The id or key of the customer request. */
  issueIdOrKey: z.string(),
});

export type CreateAttachment = z.input<typeof CreateAttachmentSchema>;
