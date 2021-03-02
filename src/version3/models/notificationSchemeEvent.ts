import { NotificationEvent } from './notificationEvent';
import { EventNotification } from './eventNotification';

/**
 * Details about a notification scheme event. */
export interface NotificationSchemeEvent {
  event?: NotificationEvent;
  notifications?: EventNotification[];
}
