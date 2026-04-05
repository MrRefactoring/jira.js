import { z } from 'zod';

export const MoveIssuesToEpicSchema = z.object({
  /** The id or key of the epic that you want to assign issues to. */
  epicIdOrKey: z.string(),
  issues: z.array(z.string()).optional(),
});

export type MoveIssuesToEpic = z.input<typeof MoveIssuesToEpicSchema>;
