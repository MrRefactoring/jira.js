import { z } from 'zod';

export const GetEpicsSchema = z.object({
  /** The ID of the board that contains the requested epics. */
  boardId: z.number(),
  /**
   * The starting index of the returned epics. Base index: 0. See the 'Pagination' section at the top of this page for
   * more details.
   */
  startAt: z.number().optional(),
  /**
   * The maximum number of epics to return per page. See the 'Pagination' section at the top of this page for more
   * details.
   */
  maxResults: z.number().optional(),
  /** Filters results to epics that are either done or not done. Valid values: true, false. */
  done: z.string().optional(),
});

export type GetEpics = z.input<typeof GetEpicsSchema>;
