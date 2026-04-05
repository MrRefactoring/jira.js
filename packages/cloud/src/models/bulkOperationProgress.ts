import { z } from 'zod';
import { DashboardUserSchema } from '#/models/dashboardUser';

export const BulkOperationProgressSchema = z.object({
  /** A timestamp of when the task was submitted. */
  created: z
    .string()
    .transform(s => new Date(s))
    .optional(),
  /**
   * Map of issue IDs for which the operation failed and that the user has permission to view, to their one or more
   * reasons for failure. These reasons are open-ended text descriptions of the error and are not selected from a
   * predefined list of standard reasons.
   */
  failedAccessibleIssues: z.record(z.string(), z.any()).optional(),
  /**
   * The number of issues that are either invalid or issues that the user doesn't have permission to view, regardless of
   * the success or failure of the operation.
   */
  invalidOrInaccessibleIssueCount: z.number().optional(),
  /** List of issue IDs for which the operation was successful and that the user has permission to view. */
  processedAccessibleIssues: z.array(z.number()).optional(),
  /** Progress of the task as a percentage. */
  progressPercent: z.number().optional(),
  /** A timestamp of when the task was started. */
  started: z
    .string()
    .transform(s => new Date(s))
    .optional(),
  /** The status of the task. */
  status: z.enum(['ENQUEUED', 'RUNNING', 'COMPLETE', 'FAILED', 'CANCEL_REQUESTED', 'CANCELLED', 'DEAD']).optional(),
  submittedBy: DashboardUserSchema.optional(),
  /** The ID of the task. */
  taskId: z.string().optional(),
  /** The number of issues that the bulk operation was attempted on. */
  totalIssueCount: z.number().optional(),
  /** A timestamp of when the task progress was last updated. */
  updated: z
    .string()
    .transform(s => new Date(s))
    .optional(),
});

export type BulkOperationProgress = z.infer<typeof BulkOperationProgressSchema>;
