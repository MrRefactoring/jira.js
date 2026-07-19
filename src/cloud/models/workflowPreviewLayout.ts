import { z } from 'zod';
import { apiObject } from '#/core';
/** Layout coordinates for workflow elements. */

export const WorkflowPreviewLayoutSchema = apiObject({
  /** The X coordinate. */
  x: z.number().optional(),
  /** The Y coordinate. */
  y: z.number().optional(),
});

export type WorkflowPreviewLayout = z.infer<typeof WorkflowPreviewLayoutSchema>;
