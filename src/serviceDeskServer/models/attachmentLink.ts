import { z } from 'zod';
import { apiObject } from '#/core';

export const AttachmentLinkSchema = apiObject({
  jiraRest: z.url().optional(),
  content: z.url().optional(),
  thumbnail: z.url().optional(),
  self: z.url().optional(),
});

export type AttachmentLink = z.infer<typeof AttachmentLinkSchema>;
