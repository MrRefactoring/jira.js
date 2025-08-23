import { z } from 'zod';

export const GetUiModificationsParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
  /**
   * Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand
   * options include:
   *
   * - `data` Returns UI modification data.
   * - `contexts` Returns UI modification contexts.
   */
  expand: z.string().optional(),
});

export type GetUiModificationsParameters = z.infer<typeof GetUiModificationsParametersSchema>;
