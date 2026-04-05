import { z } from 'zod';

export const LegacyJackson1ListAttachmentSchema = z.object({});

export type LegacyJackson1ListAttachment = z.infer<typeof LegacyJackson1ListAttachmentSchema>;
