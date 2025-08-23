import { z } from 'zod';

/** Details about an attachment. */
export const AttachmentSchema = z.object({
  /** Details of the user who added the attachment. */
  author: z.unknown().optional(),
  /** The content of the attachment. */
  content: z.string().optional(),
  /** The datetime the attachment was created. */
  created: z.string().datetime().optional(),
  /** The file name of the attachment. */
  filename: z.string().optional(),
  /** The ID of the attachment. */
  id: z.string().optional(),
  /** The MIME type of the attachment. */
  mimeType: z.string().optional(),
  /** The URL of the attachment details response. */
  self: z.string().optional(),
  /** The size of the attachment. */
  size: z.number().int().optional(),
  /** The URL of a thumbnail representing the attachment. */
  thumbnail: z.string().optional(),
});

export type Attachment = z.infer<typeof AttachmentSchema>;
