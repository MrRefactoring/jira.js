import { z } from 'zod';

export const GetAttachmentThumbnailSchema = z.object({
  /** The ID or key for the customer request the attachment is associated with */
  issueIdOrKey: z.string(),
  /** The ID of the attachment. */
  attachmentId: z.number(),
});

export type GetAttachmentThumbnail = z.input<typeof GetAttachmentThumbnailSchema>;
