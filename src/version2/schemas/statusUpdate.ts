import { z } from 'zod';

/** Details of the status being updated. */
export const StatusUpdateSchema = z.object({
  /** The description of the status. */
  description: z.string().optional(),
  /** The ID of the status. */
  id: z.string(),
  /** The name of the status. */
  name: z.string(),
  /** The category of the status. */
  statusCategory: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
});

export type StatusUpdate = z.infer<typeof StatusUpdateSchema>;
