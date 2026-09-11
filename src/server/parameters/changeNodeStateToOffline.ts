import { z } from 'zod';

export const ChangeNodeStateToOfflineSchema = z.object({
  /** ID of the node to change state */
  nodeId: z.string(),
});

export type ChangeNodeStateToOffline = z.input<typeof ChangeNodeStateToOfflineSchema>;
