import { z } from 'zod';

export const GetFailedWebhooksParametersSchema = z.object({
  /**
   * The maximum number of webhooks to return per page. If obeying the maxResults directive would result in records with
   * the same failure time being split across pages, the directive is ignored and all records with the same failure time
   * included on the page.
   */
  maxResults: z.number().int().optional(),
  /**
   * The time after which any webhook failure must have occurred for the record to be returned, expressed as
   * milliseconds since the UNIX epoch.
   */
  after: z.number().int().optional(),
});

export type GetFailedWebhooksParameters = z.infer<typeof GetFailedWebhooksParametersSchema>;
