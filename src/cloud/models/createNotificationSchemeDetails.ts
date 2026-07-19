import { z } from 'zod';
import { apiObject } from '#/core';
import { NotificationSchemeEventDetailsSchema } from './notificationSchemeEventDetails';
/** Details of an notification scheme. */

export const CreateNotificationSchemeDetailsSchema = apiObject({
  /** The description of the notification scheme. */
  description: z.string().max(4000, 'description must be at most 4000 characters').optional(),
  /** The name of the notification scheme. Must be unique (case-insensitive). */
  name: z.string().max(255, 'name must be at most 255 characters'),
  /** The list of notifications which should be added to the notification scheme. */
  notificationSchemeEvents: z.array(NotificationSchemeEventDetailsSchema).optional(),
});

export type CreateNotificationSchemeDetails = z.infer<typeof CreateNotificationSchemeDetailsSchema>;
