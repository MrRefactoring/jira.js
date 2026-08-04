import { z } from 'zod';
import { apiObject } from '#/core';
import { NotificationRecipientsRestrictionsSchema } from './notificationRecipientsRestrictions';
import { NotificationRecipientsSchema } from './notificationRecipients';
/** Details about a notification. */

export const NotificationSchema = apiObject({
  /** The HTML body of the email notification for the issue. */
  htmlBody: z.string().optional(),
  restrict: NotificationRecipientsRestrictionsSchema.optional(),
  /**
   * The subject of the email notification for the issue. If this is not specified, then the subject is set to the issue
   * key and summary.
   */
  subject: z.string().optional(),
  /** The plain text body of the email notification for the issue. */
  textBody: z.string().optional(),
  to: NotificationRecipientsSchema.optional(),
});

export type Notification = z.infer<typeof NotificationSchema>;
