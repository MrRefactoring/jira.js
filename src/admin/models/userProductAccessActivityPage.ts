import type { z } from 'zod';
import { apiObject } from '#/core';
import { UserProductAccessModelSchema } from './userProductAccessModel';
import { CursorNextPageModelSchema } from './cursorNextPageModel';

export const UserProductAccessActivityPageSchema = apiObject({
  data: UserProductAccessModelSchema.optional(),
  links: CursorNextPageModelSchema.optional(),
});

export type UserProductAccessActivityPage = z.infer<typeof UserProductAccessActivityPageSchema>;
