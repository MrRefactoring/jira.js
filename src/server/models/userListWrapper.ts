import { z } from 'zod';
import { apiObject } from '#/core';
import { ListWrapperCallbackUserSchema } from './listWrapperCallbackUser';
import { UserSchema } from './user';

export const UserListWrapperSchema = apiObject({
  backingListSize: z.number().optional(),
  callback: ListWrapperCallbackUserSchema.optional(),
  items: z.array(UserSchema).optional(),
  maxResults: z.number().optional(),
  pagingCallback: ListWrapperCallbackUserSchema.optional(),
  size: z.number().optional(),
});

export type UserListWrapper = z.infer<typeof UserListWrapperSchema>;
