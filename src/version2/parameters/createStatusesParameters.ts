import { z } from 'zod';
import { StatusScopeSchema } from './statusScope';
import { StatusCreateSchema } from './statusCreate';

export const CreateStatusesParametersSchema = z.object({
  scope: StatusScopeSchema,
  /** Details of the statuses being created. */
  statuses: z.array(StatusCreateSchema),
});

export type CreateStatusesParameters = z.infer<typeof CreateStatusesParametersSchema>;
