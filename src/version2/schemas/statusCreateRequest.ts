import { z } from 'zod';
import { StatusScopeSchema } from './statusScope';
import { StatusCreateSchema } from './statusCreate';

/** Details of the statuses being created and their scope. */
export const StatusCreateRequestSchema = z.object({
  scope: StatusScopeSchema,
  /** Details of the statuses being created. */
  statuses: z.array(StatusCreateSchema),
});

export type StatusCreateRequest = z.infer<typeof StatusCreateRequestSchema>;
