import { z } from 'zod';

export const ArchiveIssuesSchema = z.object({
  /**
   * Send the email with notification that the issue was updated to users that watch it. Admin or project admin
   * permissions are required to disable the notification.
   */
  notifyUsers: z.string().optional(),
  body: z.string().optional(),
});

export type ArchiveIssues = z.input<typeof ArchiveIssuesSchema>;
