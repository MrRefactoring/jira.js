import type { NotificationSchemeEventDetails } from './notificationSchemeEventDetails';

/** Details of a notification scheme. */
export interface CreateNotificationSchemeDetails {
  /** The description of the notification scheme. */
  description?: string;
  /** The name of the notification scheme. Must be unique (case-insensitive). */
  name: string;
  /** The list of notifications which should be added to the notification scheme. */
  notificationSchemeEvents?: NotificationSchemeEventDetails[];
}
