import { z } from 'zod';
import { apiObject } from '#/core';
import { SingleAdminInviteResultSchema } from './singleAdminInviteResult';

export const AdminInviteResponseSchema = apiObject({
  /** The account ID of the invited user. */
  id: z.string().optional(),
  /** The email address of the invited user. */
  email: z.string().optional(),
  /** List of role and group assignment results for each user */
  results: z.array(SingleAdminInviteResultSchema).optional(),
});

export type AdminInviteResponse = z.infer<typeof AdminInviteResponseSchema>;
