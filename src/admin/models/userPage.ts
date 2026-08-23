import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema } from './user';
import { LinkPageModelSchema } from './linkPageModel';

export const UserPageSchema = apiObject({
  /** 0 or more values of Users are returned */
  data: z.array(UserSchema).optional(),
  meta: apiObject({
    /** Total number of users in this Query */
    total: z.number().optional(),
  }).optional(),
  links: LinkPageModelSchema.optional(),
});

export type UserPage = z.infer<typeof UserPageSchema>;
