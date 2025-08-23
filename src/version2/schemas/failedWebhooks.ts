import { z } from 'zod';
import { FailedWebhookSchema } from './failedWebhook';

/** A page of failed webhooks. */
export const FailedWebhooksSchema = z.object({
  /**
   * The maximum number of items on the page. If the list of values is shorter than this number, then there are no more
   * pages.
   */
  maxResults: z.number().int(),
  /**
   * The URL to the next page of results. Present only if the request returned at least one result.The next page may be
   * empty at the time of receiving the response, but new failed webhooks may appear in time. You can save the URL to
   * the next page and query for new results periodically (for example, every hour).
   */
  next: z.string().optional(),
  /** The list of webhooks. */
  values: z.array(FailedWebhookSchema),
});

export type FailedWebhooks = z.infer<typeof FailedWebhooksSchema>;
