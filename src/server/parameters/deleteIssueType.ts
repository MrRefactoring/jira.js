import { z } from 'zod';

export const DeleteIssueTypeSchema = z.object({
  /** The issue type id. */
  id: z.string(),
  /** The id of an issue type to which issues associated with the removed issue type will be migrated. */
  alternativeIssueTypeId: z.string().optional(),
});

export type DeleteIssueType = z.input<typeof DeleteIssueTypeSchema>;
