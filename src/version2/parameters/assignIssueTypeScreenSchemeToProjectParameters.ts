import { z } from 'zod';

export const AssignIssueTypeScreenSchemeToProjectParametersSchema = z.object({
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: z.string().optional(),
  /** The ID of the project. */
  projectId: z.string().optional(),
});

export type AssignIssueTypeScreenSchemeToProjectParameters = z.infer<
  typeof AssignIssueTypeScreenSchemeToProjectParametersSchema
>;
