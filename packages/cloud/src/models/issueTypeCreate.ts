import { z } from 'zod';

export const IssueTypeCreateSchema = z.object({
  /** The description of the issue type. */
  description: z.string().optional(),
  /**
   * The hierarchy level of the issue type. Use:
   *
   * - `-1` for Subtask.
   * - `0` for Base.
   *
   * Defaults to `0`.
   */
  hierarchyLevel: z.number().optional(),
  /** The unique name for the issue type. The maximum length is 60 characters. */
  name: z.string(),
});

export type IssueTypeCreate = z.infer<typeof IssueTypeCreateSchema>;
