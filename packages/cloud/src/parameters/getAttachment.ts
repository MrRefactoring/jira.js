import { z } from 'zod';

export const GetAttachmentSchema = z.object({
  /** The ID of the attachment. */
  id: z.string(),
});

export type GetAttachment = z.input<typeof GetAttachmentSchema>;
