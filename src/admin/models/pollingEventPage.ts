import { z } from 'zod';
import { apiObject } from '#/core';
import { PollingEventModelSchema } from './pollingEventModel';
import { LinkPageModelSchema } from './linkPageModel';

export const PollingEventPageSchema = apiObject({
  /** 0 or more values of Event are returned */
  data: z.array(PollingEventModelSchema).optional(),
  meta: apiObject({
    /** Value for the next cursor. */
    next: z.string().optional(),
    /** Number of items on a page. */
    page_size: z.number().optional(),
  }).optional(),
  links: LinkPageModelSchema.optional(),
});

export type PollingEventPage = z.infer<typeof PollingEventPageSchema>;
