import type { NotificationSchemeEvent } from './notificationSchemeEvent';
import type { Scope } from './scope';

/** Details about a notification scheme. */
export interface NotificationScheme {
  /** The description of the notification scheme. */
  description?: string;
  /** Expand options that include additional notification scheme details in the response. */
  expand?: string;
  /** The ID of the notification scheme. */
  id?: number;
  /** The name of the notification scheme. */
  name?: string;
  /** The notification events and associated recipients. */
  notificationSchemeEvents?: NotificationSchemeEvent[];
  /** The list of project IDs associated with the notification scheme. */
  projects?: number[];
  scope?: Scope;
  self?: string;
}
