import { z } from 'zod';
import { IssueAssignRequestSchema } from '../models';

export const MoveIssuesToEpicSchema = z.object(IssueAssignRequestSchema.shape).extend({
  /** The id or key of the epic that you want to assign issues to. */
  epicIdOrKey: z.string(),
});

export type MoveIssuesToEpic = z.input<typeof MoveIssuesToEpicSchema>;
