import { z } from 'zod';

export const GetAttachmentSchema = z.object({
  /** Id of the attachment to view */
  id: z.string(),
});

export type GetAttachment = z.input<typeof GetAttachmentSchema>;
