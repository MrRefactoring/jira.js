import { z } from 'zod';
import type { AttachmentInput } from '#/core';

export const AddAttachmentsSchema = z.object({
  /** The object ID */
  objectId: z.string(),
  attachments: z.custom<AttachmentInput | AttachmentInput[]>(),
});

export type AddAttachments = z.input<typeof AddAttachmentsSchema>;
