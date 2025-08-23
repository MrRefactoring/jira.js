import { z } from 'zod';

/** Announcement banner configuration. */
export const AnnouncementBannerConfigurationSchema = z.object({
  /** Hash of the banner data. The client detects updates by comparing hash IDs. */
  hashId: z.string().optional(),
  /** Flag indicating if the announcement banner can be dismissed by the user. */
  isDismissible: z.boolean().optional(),
  /** Flag indicating if the announcement banner is enabled or not. */
  isEnabled: z.boolean().optional(),
  /** The text on the announcement banner. */
  message: z.string().optional(),
  /** Visibility of the announcement banner. */
  visibility: z.enum(['PUBLIC', 'PRIVATE']).optional(),
});

export type AnnouncementBannerConfiguration = z.infer<typeof AnnouncementBannerConfigurationSchema>;
