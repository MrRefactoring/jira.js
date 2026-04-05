import { z } from 'zod';
import { FilterSubscriptionSchema } from '#/models/filterSubscription';

/** A paginated list of subscriptions to a filter. */
export const FilterSubscriptionsListSchema = z.object({
  /** The index of the last item returned on the page. */
  'end-index': z.number().optional(),
  /** The list of items. */
  items: z.array(FilterSubscriptionSchema).optional(),
  /** The maximum number of results that could be on the page. */
  'max-results': z.number().optional(),
  /** The number of items on the page. */
  size: z.number().optional(),
  /** The index of the first item returned on the page. */
  'start-index': z.number().optional(),
});

export type FilterSubscriptionsList = z.infer<typeof FilterSubscriptionsListSchema>;
