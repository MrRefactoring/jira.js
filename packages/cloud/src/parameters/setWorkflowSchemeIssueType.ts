import { z } from 'zod';
import { IssueTypeWorkflowMappingSchema } from '../models';

export const SetWorkflowSchemeIssueTypeSchema = z
  .object({
    /** The ID of the workflow scheme. */
    id: z.number(),
    /** The ID of the issue type. */
    issueType: z.string(),
  })
  .extend(IssueTypeWorkflowMappingSchema.shape);

export type SetWorkflowSchemeIssueType = z.input<typeof SetWorkflowSchemeIssueTypeSchema>;
