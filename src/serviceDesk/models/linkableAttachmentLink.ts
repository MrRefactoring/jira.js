import type { z } from 'zod';
import { apiObject } from '#/core';
import { AttachmentLinkSchema } from './attachmentLink';

export const LinkableAttachmentLinkSchema = apiObject({
  _links: AttachmentLinkSchema.optional(),
});

export type LinkableAttachmentLink = z.infer<typeof LinkableAttachmentLinkSchema>;
