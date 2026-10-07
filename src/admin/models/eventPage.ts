import { z } from 'zod';
import { apiObject } from '#/core';
import { EventModelSchema } from './eventModel';
import { LinkPageModelSchema } from './linkPageModel';

export const EventPageSchema = apiObject({
  /** 0 or more values of Event are returned */
  data: z.array(EventModelSchema).optional(),
  meta: apiObject({
    /** Value for the next cursor */
    next: z.string().nullish(),
    /** Number of items in a page */
    page_size: z.number().optional(),
    attributes: z.unknown().optional(),
    count: z.number().nullish(),
    current: z.number().nullish(),
    end_index: z.number().nullish(),
    prev: z.string().nullish(),
    start_index: z.number().nullish(),
    total: z.number().optional(),
  }).optional(),
  links: LinkPageModelSchema.optional(),
});

export type EventPage = z.infer<typeof EventPageSchema>;
