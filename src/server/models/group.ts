import { z } from 'zod';
import { apiObject } from '#/core';
import { PagedListWrapperUserJsonApplicationUserSchema } from './pagedListWrapperUserJsonApplicationUser';

export const GroupSchema = apiObject({
  name: z.string().optional(),
  self: z.url().optional(),
  users: PagedListWrapperUserJsonApplicationUserSchema.optional(),
});

export type Group = z.infer<typeof GroupSchema>;
