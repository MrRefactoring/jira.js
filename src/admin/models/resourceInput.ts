import { z } from 'zod';
import { apiObject } from '#/core';
import { MetaSchema } from './meta';
import { LinksSchema } from './links';

export const ResourceInputSchema = apiObject({
  id: z.string(),
  meta: MetaSchema.optional(),
  links: LinksSchema.optional(),
});

export type ResourceInput = z.infer<typeof ResourceInputSchema>;
