import { z } from 'zod';

export const DeleteNodeSchema = z.object({
  /** ID of the node to delete */
  nodeId: z.string(),
});

export type DeleteNode = z.input<typeof DeleteNodeSchema>;
