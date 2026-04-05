import { z } from 'zod';

export const GetBoardByFilterIdSchema = z.object({
  /**
   * The starting index of the returned boards. Base index: 0. See the 'Pagination' section at the top of this page for
   * more details.
   */
  startAt: z.number().optional(),
  /**
   * The maximum number of boards to return per page. Default: 50. See the 'Pagination' section at the top of this page
   * for more details.
   */
  maxResults: z.number().optional(),
  /** Filters results to boards that are relevant to a filter. Not supported for next-gen boards. */
  filterId: z.number(),
});

export type GetBoardByFilterId = z.input<typeof GetBoardByFilterIdSchema>;
