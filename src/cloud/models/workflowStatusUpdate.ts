import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/** Details of the status being updated. */

export const WorkflowStatusUpdateSchema = apiObject({
  /** The description of the status. */
  description: z.string().optional(),
  /** The ID of the status. When reusing an existing status, this field should be provided. */
  id: z.string().optional(),
  /** The name of the status. */
  name: z.string(),
  /** The category of the status. */
  statusCategory: openEnum(['TODO', 'IN_PROGRESS', 'DONE']),
  /**
   * The reference of the status. If adding a new status to a team-managed workflow, this must be a UUID (for
   * company-managed a UUID is not needed).
   */
  statusReference: z.string(),
});

export type WorkflowStatusUpdate = z.infer<typeof WorkflowStatusUpdateSchema>;
