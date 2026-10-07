import { z } from 'zod';
import { apiObject } from '#/core';
import { PolicyModelSchema } from './policyModel';
import { LinkPageModelSchema } from './linkPageModel';

export const PolicyPageSchema = apiObject({
  /** 0 or more values of Policy are returned */
  data: z.array(PolicyModelSchema).optional(),
  meta: apiObject({
    /** Value for the next cursor */
    next: z.string().nullish(),
    /** Number of items in a page */
    page_size: z.number().optional(),
    attributes: z.unknown().optional(),
    current: z.number().nullish(),
    end_index: z.number().nullish(),
    prev: z.string().nullish(),
    start_index: z.number().nullish(),
    total: z.number().nullish(),
  }).optional(),
  links: LinkPageModelSchema.optional(),
});

export type PolicyPage = z.infer<typeof PolicyPageSchema>;
