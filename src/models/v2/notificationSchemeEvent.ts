import { EventNotification } from "./eventNotification";
import { NotificationEvent } from "./notificationEvent";

export interface NotificationSchemeEvent {
    event: NotificationEvent[];
    notifications: EventNotification[];
}