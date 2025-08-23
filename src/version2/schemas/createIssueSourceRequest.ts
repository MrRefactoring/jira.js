import { z } from 'zod';

export const CreateIssueSourceRequestSchema = z.object({
  /** The issue source type. This must be "Board", "Project" or "Filter". */
  type: z.enum(['Board', 'Project', 'Filter']),
  /**
   * The issue source value. This must be a board ID if the type is "Board", a project ID if the type is "Project" or a
   * filter ID if the type is "Filter".
   */
  value: z.number().int(),
});

export type CreateIssueSourceRequest = z.infer<typeof CreateIssueSourceRequestSchema>;
