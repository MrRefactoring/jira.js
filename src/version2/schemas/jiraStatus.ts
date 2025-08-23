import { z } from 'zod';
import { StatusScopeSchema } from './statusScope';

/** Details of a status. */
export const JiraStatusSchema = z.object({
  /** The description of the status. */
  description: z.string().optional(),
  /** The ID of the status. */
  id: z.string().optional(),
  /** The name of the status. */
  name: z.string().optional(),
  scope: StatusScopeSchema.optional(),
  /** The category of the status. */
  statusCategory: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
});

export type JiraStatus = z.infer<typeof JiraStatusSchema>;
