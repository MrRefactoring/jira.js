import { z } from 'zod';

export const CreateExclusionRulesRequestSchema = z.object({
  /** The IDs of the issues to exclude from the plan. */
  issueIds: z.array(z.number().int()).optional(),
  /** The IDs of the issue types to exclude from the plan. */
  issueTypeIds: z.array(z.number().int()).optional(),
  /** Issues completed this number of days ago will be excluded from the plan. */
  numberOfDaysToShowCompletedIssues: z.number().int().optional(),
  /** The IDs of the releases to exclude from the plan. */
  releaseIds: z.array(z.number().int()).optional(),
  /** The IDs of the work status categories to exclude from the plan. */
  workStatusCategoryIds: z.array(z.number().int()).optional(),
  /** The IDs of the work statuses to exclude from the plan. */
  workStatusIds: z.array(z.number().int()).optional(),
});

export type CreateExclusionRulesRequest = z.infer<typeof CreateExclusionRulesRequestSchema>;
