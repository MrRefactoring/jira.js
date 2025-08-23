import { z } from 'zod';

export const DeleteNotificationSchemeParametersSchema = z.object({
  /** The ID of the notification scheme. */
  notificationSchemeId: z.string(),
});

export type DeleteNotificationSchemeParameters = z.infer<typeof DeleteNotificationSchemeParametersSchema>;
