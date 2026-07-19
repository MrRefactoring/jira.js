import { z } from 'zod';
import { apiObject } from '#/core';
/** Properties that identify a published workflow. */

export const PublishedWorkflowIdSchema = apiObject({
  /** The entity ID of the workflow. */
  entityId: z.string().optional(),
  /** The name of the workflow. */
  name: z.string(),
});

export type PublishedWorkflowId = z.infer<typeof PublishedWorkflowIdSchema>;
