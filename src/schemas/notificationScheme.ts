import { NotificationSchemeEvent } from './notificationSchemeEvent';
import { Scope } from './scope';

export interface NotificationScheme {
    expand: string;
    id: number;
    self: string;
    name: string;
    description: string;
    notificationSchemeEvents: NotificationSchemeEvent[];
    scope: Scope[];
}
