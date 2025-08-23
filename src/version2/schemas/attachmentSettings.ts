import { z } from 'zod';

/** Details of the instance's attachment settings. */
export const AttachmentSettingsSchema = z.object({
  /** Whether the ability to add attachments is enabled. */
  enabled: z.boolean().optional(),
  /** The maximum size of attachments permitted, in bytes. */
  uploadLimit: z.number().int().optional(),
});

export type AttachmentSettings = z.infer<typeof AttachmentSettingsSchema>;
