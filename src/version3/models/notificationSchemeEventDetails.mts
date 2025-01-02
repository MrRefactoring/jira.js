import { NotificationSchemeEventTypeId } from './notificationSchemeEventTypeId.mjs';
import { NotificationSchemeNotificationDetails } from './notificationSchemeNotificationDetails.mjs';

/** Details of a notification scheme event. */
export interface NotificationSchemeEventDetails {
  event?: NotificationSchemeEventTypeId;
  /** The list of notifications mapped to a specified event. */
  notifications: NotificationSchemeNotificationDetails[];
}
