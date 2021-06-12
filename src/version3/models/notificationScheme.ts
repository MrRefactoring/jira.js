import { NotificationSchemeEvent } from './notificationSchemeEvent';
import { Scope } from './scope';

/** Details about a notification scheme. */
export interface NotificationScheme {
  /** Expand options that include additional notification scheme details in the response. */
  expand?: string;
  /** The ID of the notification scheme. */
  id?: number;
  self?: string;
  /** The name of the notification scheme. */
  name?: string;
  /** The description of the notification scheme. */
  description?: string;
  /** The notification events and associated recipients. */
  notificationSchemeEvents?: NotificationSchemeEvent[];
  scope?: Scope;
}
