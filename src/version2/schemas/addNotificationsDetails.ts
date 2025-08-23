import { z } from 'zod';
import { NotificationSchemeEventDetailsSchema } from './notificationSchemeEventDetails';

/** Details of notifications which should be added to the notification scheme. */
export const AddNotificationsDetailsSchema = z.object({
  /** The list of notifications which should be added to the notification scheme. */
  notificationSchemeEvents: z.array(NotificationSchemeEventDetailsSchema),
});

export type AddNotificationsDetails = z.infer<typeof AddNotificationsDetailsSchema>;
