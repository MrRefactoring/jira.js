import { z } from 'zod';

export const GetAttachmentThumbnailParametersSchema = z.object({
  /** The ID of the attachment. */
  id: z.string(),
  /**
   * Whether a redirect is provided for the attachment download. Clients that do not automatically follow redirects can
   * set this to `false` to avoid making multiple requests to download the attachment.
   */
  redirect: z.boolean().optional(),
  /** Whether a default thumbnail is returned when the requested thumbnail is not found. */
  fallbackToDefault: z.boolean().optional(),
  /** The maximum width to scale the thumbnail to. */
  width: z.number().int().optional(),
  /** The maximum height to scale the thumbnail to. */
  height: z.number().int().optional(),
});

export type GetAttachmentThumbnailParameters = z.infer<typeof GetAttachmentThumbnailParametersSchema>;
