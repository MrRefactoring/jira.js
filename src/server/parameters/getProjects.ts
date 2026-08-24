import { z } from 'zod';

export const GetProjectsSchema = z.object({
  /**
   * The maximum number of projects to return per page. Default: 50. See the 'Pagination' section at the top of this
   * page for more details.
   */
  maxResults: z.number().optional(),
  /** The Id of the board that contains returned projects. */
  boardId: z.number(),
  /**
   * The starting index of the returned projects. Base index: 0. See the 'Pagination' section at the top of this page
   * for more details.
   */
  startAt: z.number().optional(),
});

export type GetProjects = z.input<typeof GetProjectsSchema>;
