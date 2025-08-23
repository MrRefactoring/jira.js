import { z } from 'zod';

export const SearchResolutionsParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.string().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.string().optional(),
  /** The list of resolutions IDs to be filtered out */
  id: z.array(z.string()).optional(),
  /**
   * When set to true, return default only, when IDs provided, if none of them is default, return empty page. Default
   * value is false
   */
  onlyDefault: z.boolean().optional(),
});

export type SearchResolutionsParameters = z.infer<typeof SearchResolutionsParametersSchema>;
