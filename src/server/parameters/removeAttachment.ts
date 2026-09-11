import { z } from 'zod';

export const RemoveAttachmentSchema = z.object({
  /** Id of the attachment to remove */
  id: z.string(),
});

export type RemoveAttachment = z.input<typeof RemoveAttachmentSchema>;
