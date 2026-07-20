import { z } from 'zod';
import { apiObject } from '#/core';

export const AttachmentLinkSchema = apiObject({
  /** URL for the attachment. */
  content: z.url().optional(),
  /** REST API URL for the attachment */
  jiraRest: z.url().optional(),
  self: z.url().optional(),
  /** URL for the attachment's thumbnail image. */
  thumbnail: z.url().optional(),
});

export type AttachmentLink = z.infer<typeof AttachmentLinkSchema>;
