import { z } from 'zod';

export const GetEpicsSchema = z.object({
  /**
   * The maximum number of epics to return per page. Default: 50. See the 'Pagination' section at the top of this page
   * for more details.
   */
  maxResults: z.number().optional(),
  /** The Id of the board that contains the requested epics. */
  boardId: z.number(),
  /** Filters results to epics that are either done or not done. Valid values: true, false. */
  done: z.string().optional(),
  /**
   * The starting index of the returned epics. Base index: 0. See the 'Pagination' section at the top of this page for
   * more details.
   */
  startAt: z.number().optional(),
});

export type GetEpics = z.input<typeof GetEpicsSchema>;
