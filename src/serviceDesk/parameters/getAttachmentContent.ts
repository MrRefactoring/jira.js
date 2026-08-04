import { z } from 'zod';

export const GetAttachmentContentSchema = z.object({
  /** The ID or key for the customer request the attachment is associated with */
  issueIdOrKey: z.string(),
  /** The ID for the attachment */
  attachmentId: z.number(),
});

export type GetAttachmentContent = z.input<typeof GetAttachmentContentSchema>;
