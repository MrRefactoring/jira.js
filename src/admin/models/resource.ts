import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { MetaSchema } from './meta';
import { LinksSchema } from './links';

export const ResourceSchema = apiObject({
  id: z.string(),
  /** Status of policy application on resource */
  applicationStatus: openEnum(['applying', 'removing', 'applied', 'failed', 'scheduled', 'enabled']),
  meta: MetaSchema.optional(),
  links: LinksSchema.optional(),
  createdAt: z.string().optional(),
  metadata: z.unknown().optional(),
  type: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Resource = z.infer<typeof ResourceSchema>;
