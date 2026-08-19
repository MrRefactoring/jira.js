import { z } from 'zod';
import { DashboardUserSchema } from '../models';

export const AssignIssueSchema = z.object(DashboardUserSchema.shape).extend({
  /** The ID or key of the issue to be assigned. */
  issueIdOrKey: z.string(),
});

export type AssignIssue = z.input<typeof AssignIssueSchema>;
