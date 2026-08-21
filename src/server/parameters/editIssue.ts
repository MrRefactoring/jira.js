import { z } from 'zod';
import { IssueUpdateSchema } from '../models';

export const EditIssueSchema = z.object(IssueUpdateSchema.shape).extend({
  /** Issue id or key */
  issueIdOrKey: z.string(),
  /**
   * Send the email with notification that the issue was updated to users that watch it. Admin or project admin
   * permissions are required to disable the notification.
   */
  notifyUsers: z.string().optional(),
});

export type EditIssue = z.input<typeof EditIssueSchema>;
