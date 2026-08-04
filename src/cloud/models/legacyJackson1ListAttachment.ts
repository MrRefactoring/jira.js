import { z } from 'zod';
import { AttachmentSchema } from './attachment';

export const LegacyJackson1ListAttachmentSchema = z.array(AttachmentSchema);

export type LegacyJackson1ListAttachment = z.infer<typeof LegacyJackson1ListAttachmentSchema>;
