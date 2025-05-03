import type { NotificationSchemeEventIDPayload } from './notificationSchemeEventIDPayload';
import type { NotificationSchemeNotificationDetailsPayload } from './notificationSchemeNotificationDetailsPayload';

/** The payload for creating a notification scheme event. Defines which notifications should be sent for a specific event */
export interface NotificationSchemeEventPayload {
  event?: NotificationSchemeEventIDPayload;
  /** The configuration for notification recipents */
  notifications?: NotificationSchemeNotificationDetailsPayload[];
}
