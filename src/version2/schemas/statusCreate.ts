import { z } from 'zod';

/** Details of the status being created. */
export const StatusCreateSchema = z.object({
  /** The description of the status. */
  description: z.string().optional(),
  /** The name of the status. */
  name: z.string(),
  /** The category of the status. */
  statusCategory: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
});

export type StatusCreate = z.infer<typeof StatusCreateSchema>;
