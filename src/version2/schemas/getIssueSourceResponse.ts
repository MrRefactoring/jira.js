import { z } from 'zod';

export const GetIssueSourceResponseSchema = z.object({
  /** The issue source type. This is "Board", "Project" or "Filter". */
  type: z.enum(['Board', 'Project', 'Filter', 'Custom']),
  /**
   * The issue source value. This is a board ID if the type is "Board", a project ID if the type is "Project" or a
   * filter ID if the type is "Filter".
   */
  value: z.number().int(),
});

export type GetIssueSourceResponse = z.infer<typeof GetIssueSourceResponseSchema>;
