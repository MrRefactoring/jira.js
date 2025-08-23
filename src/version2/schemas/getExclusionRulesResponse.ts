import { z } from 'zod';

export const GetExclusionRulesResponseSchema = z.object({
  /** The IDs of the issues excluded from the plan. */
  issueIds: z.array(z.number().int()).optional(),
  /** The IDs of the issue types excluded from the plan. */
  issueTypeIds: z.array(z.number().int()).optional(),
  /** Issues completed this number of days ago are excluded from the plan. */
  numberOfDaysToShowCompletedIssues: z.number().int(),
  /** The IDs of the releases excluded from the plan. */
  releaseIds: z.array(z.number().int()).optional(),
  /** The IDs of the work status categories excluded from the plan. */
  workStatusCategoryIds: z.array(z.number().int()).optional(),
  /** The IDs of the work statuses excluded from the plan. */
  workStatusIds: z.array(z.number().int()).optional(),
});

export type GetExclusionRulesResponse = z.infer<typeof GetExclusionRulesResponseSchema>;
