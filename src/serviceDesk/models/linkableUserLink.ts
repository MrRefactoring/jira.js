import type { z } from 'zod';
import { apiObject } from '#/core';
import { UserLinkSchema } from './userLink';

export const LinkableUserLinkSchema = apiObject({
  _links: UserLinkSchema.optional(),
});

export type LinkableUserLink = z.infer<typeof LinkableUserLinkSchema>;
