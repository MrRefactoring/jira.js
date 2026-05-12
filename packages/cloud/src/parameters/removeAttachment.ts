import { z } from 'zod';

export const RemoveAttachmentSchema = z.object({
  /** The ID of the attachment. */
  id: z.string(),
});

export type RemoveAttachment = z.input<typeof RemoveAttachmentSchema>;
