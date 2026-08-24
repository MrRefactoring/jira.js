import { z } from 'zod';
import { openEnum } from '#/core';

export const PollEventsSchema = z.object({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
  /**
   * Sets the starting point for the page of results to return. Can be used when last page is reached to poll for new
   * events. The sort order is maintained in the cursor across requests.
   */
  cursor: z.string().optional(),
  /** The earliest date and time of the event represented as a UNIX epoch time in milliseconds. */
  from: z.string().optional(),
  /** The latest date and time of the event represented as a UNIX epoch time in milliseconds. */
  to: z.string().optional(),
  /** The maximum number of events to return per page. */
  limit: z.number().optional(),
  /** The order used to sort events by processing time. Defaults to ascending. */
  sortOrder: openEnum(['asc', 'desc']).optional(),
});

export type PollEvents = z.input<typeof PollEventsSchema>;
