import { z } from 'zod';

export const GetAttachmentsSchema = z.object({
  /** The object ID */
  objectId: z.string(),
});

export type GetAttachments = z.input<typeof GetAttachmentsSchema>;
