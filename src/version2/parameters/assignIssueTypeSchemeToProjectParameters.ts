import { z } from 'zod';

export const AssignIssueTypeSchemeToProjectParametersSchema = z.object({
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: z.string(),
  /** The ID of the project. */
  projectId: z.string(),
});

export type AssignIssueTypeSchemeToProjectParameters = z.infer<typeof AssignIssueTypeSchemeToProjectParametersSchema>;
