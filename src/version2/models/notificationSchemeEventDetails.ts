import type { NotificationSchemeEventTypeId } from './notificationSchemeEventTypeId';
import type { NotificationSchemeNotificationDetails } from './notificationSchemeNotificationDetails';

/** Details of a notification scheme event. */
export interface NotificationSchemeEventDetails {
  event?: NotificationSchemeEventTypeId;
  /** The list of notifications mapped to a specified event. */
  notifications: NotificationSchemeNotificationDetails[];
}
