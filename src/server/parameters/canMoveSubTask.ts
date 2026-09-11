import { z } from 'zod';

export const CanMoveSubTaskSchema = z.object({
  /** The parent issue's key or id */
  issueIdOrKey: z.string(),
});

export type CanMoveSubTask = z.input<typeof CanMoveSubTaskSchema>;
