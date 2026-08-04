import { z } from 'zod';
import { apiObject } from '#/core';
/** Details of a workflow status. */

export const WorkflowStatusSchema = apiObject({
  /** The ID of the issue status. */
  id: z.string(),
  /** The name of the status in the workflow. */
  name: z.string(),
  /**
   * Additional properties that modify the behavior of issues in this status. Supports the properties
   * `jira.issue.editable` and `issueEditable` (deprecated) that indicate whether issues are editable.
   */
  properties: z.record(z.string(), z.any()).optional(),
});

export type WorkflowStatus = z.infer<typeof WorkflowStatusSchema>;
