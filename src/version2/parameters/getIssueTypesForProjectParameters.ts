import { z } from 'zod';

export const GetIssueTypesForProjectParametersSchema = z.object({
  /** The ID of the project. */
  projectId: z.number().int(),
  /**
   * The level of the issue type to filter by. Use:
   *
   * - `-1` for Subtask.
   * - `0` for Base.
   * - `1` for Epic.
   */
  level: z.number().int().optional(),
});

export type GetIssueTypesForProjectParameters = z.infer<typeof GetIssueTypesForProjectParametersSchema>;
