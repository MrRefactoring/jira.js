import type { NotificationSchemeEventDetails } from './notificationSchemeEventDetails';

/** Details of notifications which should be added to the notification scheme. */
export interface AddNotificationsDetails {
  /** The list of notifications which should be added to the notification scheme. */
  notificationSchemeEvents: NotificationSchemeEventDetails[];
}
