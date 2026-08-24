import { z } from 'zod';

export const DeleteAttachmentSchema = z.object({
  /** The attachment ID */
  attachmentId: z.string(),
});

export type DeleteAttachment = z.input<typeof DeleteAttachmentSchema>;
