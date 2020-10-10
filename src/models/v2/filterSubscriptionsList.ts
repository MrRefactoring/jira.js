import { FilterSubscription } from './filterSubscription';

export interface FilterSubscriptionsList {
  size: number;
  items: FilterSubscription[];
  'max-results': number;
  'start-index': number;
  'end-index': number;
}
