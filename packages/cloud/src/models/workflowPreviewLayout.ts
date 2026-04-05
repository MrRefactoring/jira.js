import { z } from 'zod';

/** Layout coordinates for workflow elements. */
export const WorkflowPreviewLayoutSchema = z.object({
  /** The X coordinate. */
  x: z.number().optional(),
  /** The Y coordinate. */
  y: z.number().optional(),
});

export type WorkflowPreviewLayout = z.infer<typeof WorkflowPreviewLayoutSchema>;
