import { FailedWebhook } from './failedWebhook';

/**
 * A page of failed webhooks. */
export interface FailedWebhooks {
  /** The list of webhooks. */
  values: FailedWebhook[];
  /** The maximum number of items on the page. If the list of values is shorter than this number, then there are no more pages. */
  maxResults: number;
  /** The URL to the next page of results. Present only if the request returned at least one result.The next page may be empty at the time of receiving the response, but new failed webhooks may appear in time. You can save the URL to the next page and query for new results periodically (for example, every hour). */
  next?: string;
}
