import { NotificationScheme } from './notificationScheme';

export interface PageBeanNotificationScheme {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: NotificationScheme[];
}
