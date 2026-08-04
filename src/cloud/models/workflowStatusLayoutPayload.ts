import { z } from 'zod';
import { apiObject } from '#/core';
/** The layout of the workflow status. */

export const WorkflowStatusLayoutPayloadSchema = apiObject({
  /** The x coordinate of the status. */
  x: z.number().optional(),
  /** The y coordinate of the status. */
  y: z.number().optional(),
});

export type WorkflowStatusLayoutPayload = z.infer<typeof WorkflowStatusLayoutPayloadSchema>;
