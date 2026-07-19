import { z } from 'zod';
import { apiObject } from '#/core';
import { NotificationSchemeEventDetailsSchema } from './notificationSchemeEventDetails';
/** Details of notifications which should be added to the notification scheme. */

export const AddNotificationsDetailsSchema = apiObject({
  /** The list of notifications which should be added to the notification scheme. */
  notificationSchemeEvents: z.array(NotificationSchemeEventDetailsSchema),
});

export type AddNotificationsDetails = z.infer<typeof AddNotificationsDetailsSchema>;
