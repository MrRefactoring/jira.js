import { z } from 'zod';
import { apiObject } from '#/core';

export const UsersOrganizationUpdateSchema = apiObject({
  usernames: z.array(z.string()).optional(),
});

export type UsersOrganizationUpdate = z.infer<typeof UsersOrganizationUpdateSchema>;
