import { z } from 'zod';
import { apiObject } from '#/core';
import { DashboardUserSchema } from './dashboardUser';
/** Metadata for an issue attachment. */

export const AttachmentMetadataSchema = apiObject({
  author: DashboardUserSchema.optional(),
  /** The URL of the attachment. */
  content: z.string().optional(),
  /** The datetime the attachment was created. */
  created: z.coerce.date().optional(),
  /** The name of the attachment file. */
  filename: z.string().optional(),
  /** The ID of the attachment. */
  id: z.number().optional(),
  /** The MIME type of the attachment. */
  mimeType: z.string().optional(),
  /** Additional properties of the attachment. */
  properties: z.record(z.string(), z.any()).optional(),
  /** The URL of the attachment metadata details. */
  self: z.url().optional(),
  /** The size of the attachment. */
  size: z.number().optional(),
  /** The URL of a thumbnail representing the attachment. */
  thumbnail: z.string().optional(),
});

export type AttachmentMetadata = z.infer<typeof AttachmentMetadataSchema>;
