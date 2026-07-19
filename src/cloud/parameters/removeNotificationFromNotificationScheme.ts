import { z } from 'zod';

export const RemoveNotificationFromNotificationSchemeSchema = z.object({
  /** The ID of the notification scheme. */
  notificationSchemeId: z.string(),
  /** The ID of the notification. */
  notificationId: z.string(),
});

export type RemoveNotificationFromNotificationScheme = z.input<typeof RemoveNotificationFromNotificationSchemeSchema>;
