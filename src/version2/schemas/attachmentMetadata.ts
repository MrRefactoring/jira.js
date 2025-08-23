import { z } from 'zod';

/** Metadata for an issue attachment. */
export const AttachmentMetadataSchema = z.object({
  /** Details of the user who attached the file. */
  author: z.unknown().optional(),
  /** The URL of the attachment. */
  content: z.string().optional(),
  /** The datetime the attachment was created. */
  created: z.string().datetime().optional(),
  /** The name of the attachment file. */
  filename: z.string().optional(),
  /** The ID of the attachment. */
  id: z.number().int().optional(),
  /** The MIME type of the attachment. */
  mimeType: z.string().optional(),
  /** Additional properties of the attachment. */
  properties: z.object({}).optional(),
  /** The URL of the attachment metadata details. */
  self: z.string().optional(),
  /** The size of the attachment. */
  size: z.number().int().optional(),
  /** The URL of a thumbnail representing the attachment. */
  thumbnail: z.string().optional(),
});

export type AttachmentMetadata = z.infer<typeof AttachmentMetadataSchema>;
