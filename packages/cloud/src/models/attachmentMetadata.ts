import { z } from 'zod';
import { DashboardUserSchema } from '#/models/dashboardUser';

/** Metadata for an issue attachment. */
export const AttachmentMetadataSchema = z.object({
  author: DashboardUserSchema.optional(),
  /** The URL of the attachment. */
  content: z.string().optional(),
  /** The datetime the attachment was created. */
  created: z
    .string()
    .transform(s => new Date(s))
    .optional(),
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
