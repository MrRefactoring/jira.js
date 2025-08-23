import { z } from 'zod';

export const GetDynamicWebhooksForAppParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
});

export type GetDynamicWebhooksForAppParameters = z.infer<typeof GetDynamicWebhooksForAppParametersSchema>;
