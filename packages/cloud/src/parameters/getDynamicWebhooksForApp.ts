import { z } from 'zod';

export const GetDynamicWebhooksForAppSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
});

export type GetDynamicWebhooksForApp = z.input<typeof GetDynamicWebhooksForAppSchema>;
