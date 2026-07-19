import type { z } from 'zod';
import { apiObject } from '#/core';
import { SelfLinkSchema } from './selfLink';

export const LinkableSchema = apiObject({
  _links: SelfLinkSchema.optional(),
});

export type Linkable = z.infer<typeof LinkableSchema>;
