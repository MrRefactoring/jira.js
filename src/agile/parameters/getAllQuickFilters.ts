import { z } from 'zod';

export const GetAllQuickFiltersSchema = z.object({
  /** The ID of the board that contains the requested quick filters. */
  boardId: z.number(),
  /**
   * The starting index of the returned quick filters. Base index: 0. See the 'Pagination' section at the top of this
   * page for more details.
   */
  startAt: z.number().optional(),
  /**
   * The maximum number of sprints to return per page. See the 'Pagination' section at the top of this page for more
   * details.
   */
  maxResults: z.number().optional(),
});

export type GetAllQuickFilters = z.input<typeof GetAllQuickFiltersSchema>;
