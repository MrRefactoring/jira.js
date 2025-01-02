import { NotificationRecipients } from './notificationRecipients.mjs';
import { NotificationRecipientsRestrictions } from './notificationRecipientsRestrictions.mjs';

/** Details about a notification. */
export interface Notification {
  /**
   * The subject of the email notification for the issue. If this is not specified, then the subject is set to the issue
   * key and summary.
   */
  subject?: string;
  /** The plain text body of the email notification for the issue. */
  textBody?: string;
  /** The HTML body of the email notification for the issue. */
  htmlBody?: string;
  to?: NotificationRecipients;
  restrict?: NotificationRecipientsRestrictions;
}
