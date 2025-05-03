import type { NotificationSchemeEventDetails } from '../models';

export interface AddNotifications {
  /** The ID of the notification scheme. */
  id: string;
  /** The list of notifications which should be added to the notification scheme. */
  notificationSchemeEvents: NotificationSchemeEventDetails[];
}
