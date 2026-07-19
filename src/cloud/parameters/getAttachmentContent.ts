import { z } from 'zod';

export const GetAttachmentContentSchema = z.object({
  /** The ID of the attachment. */
  id: z.string(),
  /**
   * Whether a redirect is provided for the attachment download. Clients that do not automatically follow redirects can
   * set this to `false` to avoid making multiple requests to download the attachment.
   */
  redirect: z.boolean().optional(),
});

export type GetAttachmentContent = z.input<typeof GetAttachmentContentSchema>;
