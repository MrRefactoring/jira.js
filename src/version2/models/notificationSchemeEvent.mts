import { EventNotification } from './eventNotification.mjs';
import { NotificationEvent } from './notificationEvent.mjs';

/** Details about a notification scheme event. */
export interface NotificationSchemeEvent {
  event?: NotificationEvent;
  notifications?: EventNotification[];
}
