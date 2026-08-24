import { z } from 'zod';
import type { AttachmentInput } from '#/core';

export const AddAttachmentSchema = z.object({
  /** Issue id or key */
  issueIdOrKey: z.string(),
  attachments: z.custom<AttachmentInput | AttachmentInput[]>(),
});

export type AddAttachment = z.input<typeof AddAttachmentSchema>;
