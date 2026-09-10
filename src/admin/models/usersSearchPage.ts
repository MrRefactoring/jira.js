import { z } from 'zod';
import { apiObject } from '#/core';
import { PublicUserSchema } from './publicUser';
import { LinkPageModelSchema } from './linkPageModel';

export const UsersSearchPageSchema = apiObject({
  data: z.array(PublicUserSchema),
  links: LinkPageModelSchema.optional(),
});

export type UsersSearchPage = z.infer<typeof UsersSearchPageSchema>;
