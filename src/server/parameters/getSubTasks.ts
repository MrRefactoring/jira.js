import { z } from 'zod';

export const GetSubTasksSchema = z.object({
  /** The parent issue's key or id */
  issueIdOrKey: z.string(),
});

export type GetSubTasks = z.input<typeof GetSubTasksSchema>;
