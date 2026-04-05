import { z } from 'zod';
import { IssueTypeWorkflowMappingSchema } from '../models';

export const SetWorkflowSchemeDraftIssueTypeSchema = z
  .object({
    /** The ID of the workflow scheme that the draft belongs to. */
    id: z.number(),
    /** The ID of the issue type. */
    issueType: z.string(),
  })
  .extend(IssueTypeWorkflowMappingSchema.shape);

export type SetWorkflowSchemeDraftIssueType = z.input<typeof SetWorkflowSchemeDraftIssueTypeSchema>;
