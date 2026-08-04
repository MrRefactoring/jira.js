import { z } from 'zod';

export const GetUiModificationsSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
  /**
   * Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand
   * options include:
   *
   * - `data` Returns UI modification data.
   * - `contexts` Returns UI modification contexts.
   */
  expand: z
    .union([z.string(), z.array(z.string()), z.enum(['data', 'contexts']), z.array(z.enum(['data', 'contexts']))])
    .optional(),
});

export type GetUiModifications = z.input<typeof GetUiModificationsSchema>;
