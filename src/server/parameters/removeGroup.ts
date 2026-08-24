import { z } from 'zod';

export const RemoveGroupSchema = z.object({
  /** The name of the group to delete. */
  groupname: z.string(),
  /** A different group to transfer the restrictions to. */
  swapGroup: z.string().optional(),
});

export type RemoveGroup = z.input<typeof RemoveGroupSchema>;
