import { z } from 'zod';
import { IssueAssignRequestSchema } from '../models';

export const MoveIssuesToSprintSchema = z.object(IssueAssignRequestSchema.shape).extend({
  /** The Id of the sprint that you want to assign issues to. */
  sprintId: z.number(),
});

export type MoveIssuesToSprint = z.input<typeof MoveIssuesToSprintSchema>;
