import { z } from 'zod';
import { apiObject } from '#/core';
import { AdminInviteResponseSchema } from './adminInviteResponse';

export const MultidirectoryInviteSuccessResponseSchema = apiObject({
  /** List of invite results for each invited user */
  data: z.array(AdminInviteResponseSchema).optional(),
});

export type MultidirectoryInviteSuccessResponse = z.infer<typeof MultidirectoryInviteSuccessResponseSchema>;
