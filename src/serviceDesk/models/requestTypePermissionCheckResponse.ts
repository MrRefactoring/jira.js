import { z } from 'zod';
import { apiObject } from '#/core';

export const RequestTypePermissionCheckResponseSchema = apiObject({
  /** List of request type IDs for which the user has permission to administer. */
  canAdminister: z.array(z.number()).optional(),
  /** List of request type IDs for which the user can create requests. */
  canCreateRequest: z.array(z.number()).optional(),
});

export type RequestTypePermissionCheckResponse = z.infer<typeof RequestTypePermissionCheckResponseSchema>;
