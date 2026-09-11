import { z } from 'zod';

export const GetAllBoardsSchema = z.object({
  /** The maximum number of boards to return per page. Default: 50. */
  maxResults: z.number().optional(),
  /** Filters results to boards that match or partially match the specified name. */
  name: z.string().optional(),
  /** Filters results to boards that are relevant to a project. */
  projectKeyOrId: z.string().optional(),
  /** Filters results to boards of the specified type. Valid values: scrum, kanban. */
  type: z.union([z.string(), z.array(z.string())]).optional(),
  /** The starting index of the returned boards. Base index: 0. */
  startAt: z.number().optional(),
});

export type GetAllBoards = z.input<typeof GetAllBoardsSchema>;
