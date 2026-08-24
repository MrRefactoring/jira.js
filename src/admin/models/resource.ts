import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { MetaSchema } from './meta';
import { LinksSchema } from './links';

export const ResourceSchema = apiObject({
  id: z.string(),
  /** Status of policy application on resource */
  applicationStatus: openEnum(['applying', 'removing', 'applied', 'failed', 'scheduled']),
  meta: MetaSchema.optional(),
  links: LinksSchema.optional(),
});

export type Resource = z.infer<typeof ResourceSchema>;
