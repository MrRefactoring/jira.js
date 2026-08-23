import type { z } from 'zod';
import { apiObject } from '#/core';
import { MetaSchema } from './meta';
import { LinksSchema } from './links';

export const ResourceUpdateInputSchema = apiObject({
  meta: MetaSchema.optional(),
  links: LinksSchema.optional(),
});

export type ResourceUpdateInput = z.infer<typeof ResourceUpdateInputSchema>;
