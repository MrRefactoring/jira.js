import { z } from 'zod';
import { apiObject } from '#/core';
import { TemporaryWebAttachmentSchema } from './temporaryWebAttachment';

export const CreateTemporaryWebAttachmentResultSchema = apiObject({
  temporaryAttachments: z.array(TemporaryWebAttachmentSchema).optional(),
});

export type CreateTemporaryWebAttachmentResult = z.infer<typeof CreateTemporaryWebAttachmentResultSchema>;
