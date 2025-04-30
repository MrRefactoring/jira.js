import type { AddNotificationsDetails } from '../models';

export interface AddNotifications extends AddNotificationsDetails {
  /** The ID of the notification scheme. */
  id: string;
}
