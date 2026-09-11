import { z } from 'zod';
import { apiObject } from '#/core';
import { GroupJsonSchema } from './groupJson';
import { UserJsonSchema } from './userJson';

export const ToJsonSchema = apiObject({
  assignee: z.boolean().optional(),
  groups: z.array(GroupJsonSchema).optional(),
  reporter: z.boolean().optional(),
  users: z.array(UserJsonSchema).optional(),
  voters: z.boolean().optional(),
  watchers: z.boolean().optional(),
});

export type ToJson = z.infer<typeof ToJsonSchema>;
