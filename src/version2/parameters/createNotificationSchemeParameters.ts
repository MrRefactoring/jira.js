import { z } from 'zod';
import { NotificationSchemeEventDetailsSchema } from './notificationSchemeEventDetails';

export const CreateNotificationSchemeParametersSchema = z.object({
  /** The description of the notification scheme. */
  description: z.string().optional(),
  /** The name of the notification scheme. Must be unique (case-insensitive). */
  name: z.string(),
  /** The list of notifications which should be added to the notification scheme. */
  notificationSchemeEvents: z.array(NotificationSchemeEventDetailsSchema).optional(),
});

export type CreateNotificationSchemeParameters = z.infer<typeof CreateNotificationSchemeParametersSchema>;
