import { z } from 'zod';

export const GetBulkScreenTabsParametersSchema = z.object({
  /**
   * The list of screen IDs. To include multiple screen IDs, provide an ampersand-separated list. For example,
   * `screenId=10000&screenId=10001`.
   */
  screenId: z.array(z.number().int()).optional(),
  /**
   * The list of tab IDs. To include multiple tab IDs, provide an ampersand-separated list. For example,
   * `tabId=10000&tabId=10001`.
   */
  tabId: z.array(z.number().int()).optional(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. The maximum number is 100, */
  maxResult: z.number().int().optional(),
});

export type GetBulkScreenTabsParameters = z.infer<typeof GetBulkScreenTabsParametersSchema>;
