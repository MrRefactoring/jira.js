import { NotificationRecipients } from './notificationRecipients';
import { NotificationRecipientsRestrictions } from './notificationRecipientsRestrictions';

export interface Notification {
  subject: string;
  textBody: string;
  htmlBody: string;
  to: NotificationRecipients[];
  restrict: NotificationRecipientsRestrictions[];
  [key: string]: unknown;
}
