import { z } from 'zod';

export const GetPrecomputationsParametersSchema = z.object({
  /**
   * The function key in format:
   *
   * - Forge: `ari:cloud:ecosystem::extension/[App ID]/[Environment ID]/static/[Function key from manifest]`
   * - Connect: `[App key]__[Module key]`
   */
  functionKey: z.array(z.string()).optional(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#ordering) the results by a field:
   *
   * - `functionKey` Sorts by the functionKey.
   * - `used` Sorts by the used timestamp.
   * - `created` Sorts by the created timestamp.
   * - `updated` Sorts by the updated timestamp.
   */
  orderBy: z.string().optional(),
});

export type GetPrecomputationsParameters = z.infer<typeof GetPrecomputationsParametersSchema>;
