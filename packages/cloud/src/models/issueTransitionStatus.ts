import { z } from 'zod';

export const IssueTransitionStatusSchema = z.object({
  /** The unique ID of the status. */
  statusId: z.number().optional(),
  /** The name of the status. */
  statusName: z.string().optional(),
});

export type IssueTransitionStatus = z.infer<typeof IssueTransitionStatusSchema>;
