import { z } from 'zod';
import { apiObject } from '#/core';
import { ListWrapperCallbackUserJsonSchema } from './listWrapperCallbackUserJson';
import { UserJsonSchema } from './userJson';

export const PagedListWrapperUserJsonApplicationUserSchema = apiObject({
  backingListSize: z.number().optional(),
  callback: ListWrapperCallbackUserJsonSchema.optional(),
  items: z.array(UserJsonSchema).optional(),
  maxResults: z.number().optional(),
  pagingCallback: ListWrapperCallbackUserJsonSchema.optional(),
  size: z.number().optional(),
});

export type PagedListWrapperUserJsonApplicationUser = z.infer<typeof PagedListWrapperUserJsonApplicationUserSchema>;
