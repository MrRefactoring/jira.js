import { Notification } from '../models';

export interface Notify extends Notification {
  /** ID or key of the issue that the notification is sent for. */
  issueIdOrKey: string;
}
