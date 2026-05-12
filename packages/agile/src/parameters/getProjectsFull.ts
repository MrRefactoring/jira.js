import { z } from 'zod';

export const GetProjectsFullSchema = z.object({
  /** The ID of the board that contains returned projects. */
  boardId: z.number(),
});

export type GetProjectsFull = z.input<typeof GetProjectsFullSchema>;
