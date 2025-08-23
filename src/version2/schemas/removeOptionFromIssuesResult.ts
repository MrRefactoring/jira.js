import { z } from 'zod';

export const RemoveOptionFromIssuesResultSchema = z.object({
  /**
   * A collection of errors related to unchanged issues. The collection size is limited, which means not all errors may
   * be returned.
   */
  errors: z.unknown().optional(),
  /** The IDs of the modified issues. */
  modifiedIssues: z.array(z.number().int()).optional(),
  /** The IDs of the unchanged issues, those issues where errors prevent modification. */
  unmodifiedIssues: z.array(z.number().int()).optional(),
});

export type RemoveOptionFromIssuesResult = z.infer<typeof RemoveOptionFromIssuesResultSchema>;
