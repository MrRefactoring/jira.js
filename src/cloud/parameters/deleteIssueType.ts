import { z } from 'zod';

export const DeleteIssueTypeSchema = z.object({
  /** The ID of the issue type. */
  id: z.string(),
  /** The ID of the replacement issue type. */
  alternativeIssueTypeId: z.string().optional(),
});

export type DeleteIssueType = z.input<typeof DeleteIssueTypeSchema>;
