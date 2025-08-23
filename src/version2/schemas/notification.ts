import { z } from 'zod';

/** Details about a notification. */
export const NotificationSchema = z.object({
  /** The HTML body of the email notification for the issue. */
  htmlBody: z.string().optional(),
  /** Restricts the notifications to users with the specified permissions. */
  restrict: z.unknown().optional(),
  /**
   * The subject of the email notification for the issue. If this is not specified, then the subject is set to the issue
   * key and summary.
   */
  subject: z.string().optional(),
  /** The plain text body of the email notification for the issue. */
  textBody: z.string().optional(),
  /** The recipients of the email notification for the issue. */
  to: z.unknown().optional(),
});

export type Notification = z.infer<typeof NotificationSchema>;
