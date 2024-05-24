import type { NotificationSchemeEventTypeId } from './notificationSchemeEventTypeId.js';
import type { NotificationSchemeNotificationDetails } from './notificationSchemeNotificationDetails.js';

/** Details of a notification scheme event. */
export interface NotificationSchemeEventDetails {
  event?: NotificationSchemeEventTypeId;
  /** The list of notifications mapped to a specified event. */
  notifications: NotificationSchemeNotificationDetails[];
}
