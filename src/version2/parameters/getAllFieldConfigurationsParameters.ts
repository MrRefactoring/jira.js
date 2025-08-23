import { z } from 'zod';

export const GetAllFieldConfigurationsParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
  /**
   * The list of field configuration IDs. To include multiple IDs, provide an ampersand-separated list. For example,
   * `id=10000&id=10001`.
   */
  id: z.array(z.number().int()).optional(),
  /** If _true_ returns default field configurations only. */
  isDefault: z.boolean().optional(),
  /** The query string used to match against field configuration names and descriptions. */
  query: z.string().optional(),
});

export type GetAllFieldConfigurationsParameters = z.infer<typeof GetAllFieldConfigurationsParametersSchema>;
