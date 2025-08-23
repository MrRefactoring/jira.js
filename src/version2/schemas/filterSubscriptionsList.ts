import { z } from 'zod';
import { FilterSubscriptionSchema } from './filterSubscription';

/** A paginated list of subscriptions to a filter. */
export const FilterSubscriptionsListSchema = z
  .object({
    /** The index of the last item returned on the page. */
    'end-index': z.number().int().optional(),
    /** The list of items. */
    items: z.array(FilterSubscriptionSchema).optional(),
    /** The maximum number of results that could be on the page. */
    'max-results': z.number().int().optional(),
    /** The number of items on the page. */
    size: z.number().int().optional(),
    /** The index of the first item returned on the page. */
    'start-index': z.number().int().optional(),
  })
  .transform(val => ({
    endIndex: val['end-index'],
    items: val['items'],
    maxResults: val['max-results'],
    size: val['size'],
    startIndex: val['start-index'],
  }));

export type FilterSubscriptionsList = z.infer<typeof FilterSubscriptionsListSchema>;
