import { z } from 'zod';
import { apiObject } from '#/core';

export const UserPermissionsSchema = apiObject({
  ADD_MEMBERS: z.boolean(),
  DELETE_TEAM: z.boolean(),
  REMOVE_MEMBERS: z.boolean(),
  UPDATE_TEAM: z.boolean(),
});

export type UserPermissions = z.infer<typeof UserPermissionsSchema>;
