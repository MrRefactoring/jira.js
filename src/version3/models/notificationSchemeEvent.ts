import type { EventNotification } from './eventNotification.js';
import type { NotificationEvent } from './notificationEvent.js';

/** Details about a notification scheme event. */
export interface NotificationSchemeEvent {
  event?: NotificationEvent;
  notifications?: EventNotification[];
}
