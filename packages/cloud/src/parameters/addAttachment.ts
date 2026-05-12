import { z } from 'zod';
import { type AttachmentInput } from '@jira.js/base';

export const AddAttachmentSchema = z.object({
  /** The ID or key of the issue that attachments are added to. */
  issueIdOrKey: z.string(),
  attachments: z.custom<AttachmentInput | AttachmentInput[]>(),
});

export type AddAttachment = z.input<typeof AddAttachmentSchema>;
