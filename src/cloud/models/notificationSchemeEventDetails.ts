import { z } from 'zod';
import { apiObject } from '#/core';
import { NotificationSchemeEventTypeIdSchema } from './notificationSchemeEventTypeId';
import { NotificationSchemeNotificationDetailsSchema } from './notificationSchemeNotificationDetails';
/** Details of a notification scheme event. */

export const NotificationSchemeEventDetailsSchema = apiObject({
  event: NotificationSchemeEventTypeIdSchema.optional(),
  /** The list of notifications mapped to a specified event. */
  notifications: z.array(NotificationSchemeNotificationDetailsSchema),
});

export type NotificationSchemeEventDetails = z.infer<typeof NotificationSchemeEventDetailsSchema>;
