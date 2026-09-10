import { z } from 'zod';
import { apiObject } from '#/core';
import { OrgModelSchema } from './orgModel';
import { LinkPageModelSchema } from './linkPageModel';

export const OrgPageSchema = apiObject({
  /** 0 or more values of `Org` are returned */
  data: z.array(OrgModelSchema).optional(),
  links: LinkPageModelSchema.optional(),
  meta: z.unknown().optional(),
});

export type OrgPage = z.infer<typeof OrgPageSchema>;
