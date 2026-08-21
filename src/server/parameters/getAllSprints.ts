import { z } from 'zod';

export const GetAllSprintsSchema = z.object({
  /** The maximum number of sprints to return per page. Default: 50. */
  maxResults: z.number().optional(),
  /** The Id of the board that contains the requested sprints. */
  boardId: z.number(),
  /**
   * Filters results to sprints in specified states. Valid values: future, active, closed. You can define multiple
   * states separated by commas, e.g. state=active,closed
   */
  state: z.union([z.string(), z.array(z.string())]).optional(),
  /** The starting index of the returned sprints. Base index: 0. */
  startAt: z.number().optional(),
});

export type GetAllSprints = z.input<typeof GetAllSprintsSchema>;
