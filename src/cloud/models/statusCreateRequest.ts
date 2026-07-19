import { z } from 'zod';
import { apiObject } from '#/core';
import { StatusScopeSchema } from './statusScope';
import { StatusCreateSchema } from './statusCreate';
/** Details of the statuses being created and their scope. */

export const StatusCreateRequestSchema = apiObject({
  scope: StatusScopeSchema,
  /** Details of the statuses being created. */
  statuses: z.array(StatusCreateSchema),
});

export type StatusCreateRequest = z.infer<typeof StatusCreateRequestSchema>;
