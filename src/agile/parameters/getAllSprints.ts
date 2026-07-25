import { z } from 'zod';

export const GetAllSprintsSchema = z.object({
  /** The ID of the board that contains the requested sprints. */
  boardId: z.number(),
  /**
   * The starting index of the returned sprints. Base index: 0. See the 'Pagination' section at the top of this page for
   * more details.
   */
  startAt: z.number().optional(),
  /**
   * The maximum number of sprints to return per page. See the 'Pagination' section at the top of this page for more
   * details.
   */
  maxResults: z.number().optional(),
  /**
   * Filters results to sprints in specified states. Valid values: future, active, closed. You can define multiple
   * states separated by commas, e.g. state=active,closed
   */
  state: z.enum(['future', 'active', 'closed']).optional(),
});

export type GetAllSprints = z.input<typeof GetAllSprintsSchema>;
