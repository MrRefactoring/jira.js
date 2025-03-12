import type { FilterSubscription } from './filterSubscription';

/** A paginated list of subscriptions to a filter. */
export interface FilterSubscriptionsList {
  /** The index of the last item returned on the page. */
  'end-index'?: number;
  /** The list of items. */
  items?: FilterSubscription[];
  /** The maximum number of results that could be on the page. */
  'max-results'?: number;
  /** The number of items on the page. */
  size?: number;
  /** The index of the first item returned on the page. */
  'start-index'?: number;
}
