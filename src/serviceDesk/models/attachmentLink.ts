import { z } from 'zod';
import { apiObject } from '#/core';

export const AttachmentLinkSchema = apiObject({
  /** URL for the attachment. */
  content: z.string().url().optional(),
  /** REST API URL for the attachment */
  jiraRest: z.string().url().optional(),
  self: z.string().url().optional(),
  /** URL for the attachment's thumbnail image. */
  thumbnail: z.string().url().optional(),
});

export type AttachmentLink = z.infer<typeof AttachmentLinkSchema>;
