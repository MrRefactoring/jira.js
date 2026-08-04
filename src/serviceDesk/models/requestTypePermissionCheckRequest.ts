import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const RequestTypePermissionCheckRequestSchema = apiObject({
  /** The account ID of a user. */
  accountId: z.string().optional(),
  /** List of requested permissions. */
  permissions: z.array(openEnum(['canCreateRequest', 'canAdminister'])).optional(),
  /** List of request type IDs. */
  requestTypeIds: z.array(z.number()).optional(),
});

export type RequestTypePermissionCheckRequest = z.infer<typeof RequestTypePermissionCheckRequestSchema>;
