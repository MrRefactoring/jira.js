import { z } from 'zod';
import { DashboardUserSchema } from '../models';

export const AssignIssueSchema = z
  .object({
    /** The ID or key of the issue to be assigned. */
    issueIdOrKey: z.string(),
  })
  .extend(DashboardUserSchema.shape);

export type AssignIssue = z.input<typeof AssignIssueSchema>;
