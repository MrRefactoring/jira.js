import { z } from 'zod';
import { apiObject } from '#/core';
import { GroupSchema } from './group';
import { UserSchema } from './user';
/** The users and groups who own the board. */

export const BoardAdminsSchema = apiObject({
  groups: z.array(GroupSchema).optional(),
  users: z.array(UserSchema).optional(),
});

export type BoardAdmins = z.infer<typeof BoardAdminsSchema>;
