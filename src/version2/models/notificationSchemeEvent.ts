import { NotificationEvent } from "./notificationEvent";
/**Details about a notification scheme event.*/
export interface NotificationSchemeEvent {
    event?: NotificationEvent;
    notifications?: EventNotification[];
}