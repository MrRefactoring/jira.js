import { z } from 'zod';

export const RemoveNotificationFromNotificationSchemeParametersSchema = z.object({
  /** The ID of the notification scheme. */
  notificationSchemeId: z.string(),
  /** The ID of the notification. */
  notificationId: z.string(),
});

export type RemoveNotificationFromNotificationSchemeParameters = z.infer<
  typeof RemoveNotificationFromNotificationSchemeParametersSchema
>;
