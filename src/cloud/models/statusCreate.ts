import { z } from 'zod';
import { apiObject } from '#/core';
/** Details of the status being created. */

export const StatusCreateSchema = apiObject({
  /** The description of the status. */
  description: z.string().optional(),
  /** The name of the status. */
  name: z.string().max(255, 'name must be at most 255 characters'),
  /** The category of the status. */
  statusCategory: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
});

export type StatusCreate = z.infer<typeof StatusCreateSchema>;
