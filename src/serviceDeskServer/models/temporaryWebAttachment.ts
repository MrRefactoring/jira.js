import { z } from 'zod';
import { apiObject } from '#/core';

export const TemporaryWebAttachmentSchema = apiObject({
  temporaryAttachmentId: z.string().optional(),
  fileName: z.string().optional(),
});

export type TemporaryWebAttachment = z.infer<typeof TemporaryWebAttachmentSchema>;
