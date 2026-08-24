import { z } from 'zod';
import { apiObject } from '#/core';
import { DomainModelSchema } from './domainModel';
import { LinkPageModelSchema } from './linkPageModel';

export const DomainPageSchema = apiObject({
  /** 0 or more values of Domain are returned */
  data: z.array(DomainModelSchema).optional(),
  links: LinkPageModelSchema.optional(),
});

export type DomainPage = z.infer<typeof DomainPageSchema>;
