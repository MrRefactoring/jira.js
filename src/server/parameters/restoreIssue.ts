import { z } from 'zod';

export const RestoreIssueSchema = z.object({
  /** Issue id or key */
  issueIdOrKey: z.string(),
  /**
   * Send the email with notification that the issue was updated to users that watch it. Admin or project admin
   * permissions are required to disable the notification.
   */
  notifyUsers: z.string().optional(),
});

export type RestoreIssue = z.input<typeof RestoreIssueSchema>;
