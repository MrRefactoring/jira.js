import type { NotificationSchemeEventPayload } from './notificationSchemeEventPayload';
import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';

/**
 * The payload for creating a notification scheme. The user has to supply the ID for the default notification scheme.
 * For CMP this is provided in the project payload and should be left empty, for TMP it's provided using this payload
 */
export interface NotificationSchemePayload {
  /** The description of the notification scheme */
  description?: string;
  /** The name of the notification scheme */
  name?: string;
  /** The events and notifications for the notification scheme */
  notificationSchemeEvents?: NotificationSchemeEventPayload[];
  /** The strategy to use when there is a conflict with an existing entity */
  onConflict?: 'FAIL' | 'USE' | 'NEW' | string;
  pcri?: ProjectCreateResourceIdentifier;
}
