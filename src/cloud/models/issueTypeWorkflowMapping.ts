import { z } from 'zod';
import { apiObject } from '#/core';
/** Details about the mapping between an issue type and a workflow. */

export const IssueTypeWorkflowMappingSchema = apiObject({
  /** The ID of the issue type. Not required if updating the issue type-workflow mapping. */
  issueType: z.string().optional(),
  /**
   * Set to true to create or update the draft of a workflow scheme and update the mapping in the draft, when the
   * workflow scheme cannot be edited. Defaults to `false`. Only applicable when updating the workflow-issue types
   * mapping.
   */
  updateDraftIfNeeded: z.boolean().optional(),
  /** The name of the workflow. */
  workflow: z.string().optional(),
});

export type IssueTypeWorkflowMapping = z.infer<typeof IssueTypeWorkflowMappingSchema>;
