import { z } from 'zod';
import { apiObject } from '#/core';
import { UserJsonSchema } from './userJson';

export const GetUsersFromGroupSchema = apiObject({
  self: z.string().optional(),
  maxResults: z.number().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
  isLast: z.boolean().optional(),
  values: z.array(UserJsonSchema).optional(),
});

export type GetUsersFromGroup = z.infer<typeof GetUsersFromGroupSchema>;
