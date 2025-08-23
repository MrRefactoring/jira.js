import { z } from 'zod';
import { NotificationSchemeEventDetailsSchema } from './notificationSchemeEventDetails';

export const AddNotificationsParametersSchema = z.object({
  /** The ID of the notification scheme. */
  id: z.string(),
  /** The list of notifications which should be added to the notification scheme. */
  notificationSchemeEvents: z.array(NotificationSchemeEventDetailsSchema),
});

export type AddNotificationsParameters = z.infer<typeof AddNotificationsParametersSchema>;
