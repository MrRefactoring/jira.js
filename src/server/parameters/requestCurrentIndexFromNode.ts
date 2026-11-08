import { z } from 'zod';

export const RequestCurrentIndexFromNodeSchema = z.object({
  /** ID of the node to request index from */
  nodeId: z.string(),
});

export type RequestCurrentIndexFromNode = z.input<typeof RequestCurrentIndexFromNodeSchema>;
