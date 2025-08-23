import { z } from 'zod';
import { StatusProjectIssueTypeUsagePageSchema } from './statusProjectIssueTypeUsagePage';

/** The issue types using this status in a project. */
export const StatusProjectIssueTypeUsageDTOSchema = z.object({
  issueTypes: StatusProjectIssueTypeUsagePageSchema.optional(),
  /** The project ID. */
  projectId: z.string().optional(),
  /** The status ID. */
  statusId: z.string().optional(),
});

export type StatusProjectIssueTypeUsageDTO = z.infer<typeof StatusProjectIssueTypeUsageDTOSchema>;
