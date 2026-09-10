import { z } from 'zod';
import { apiObject } from '#/core';
import { PublicGroupSchema } from './publicGroup';
import { LinkPageModelSchema } from './linkPageModel';

export const GroupsSearchPageSchema = apiObject({
  data: z.array(PublicGroupSchema),
  links: LinkPageModelSchema.optional(),
});

export type GroupsSearchPage = z.infer<typeof GroupsSearchPageSchema>;
