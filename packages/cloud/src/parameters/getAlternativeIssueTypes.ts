import { z } from 'zod';

export const GetAlternativeIssueTypesSchema = z.object({
  /** The ID of the issue type. */
  id: z.string(),
});

export type GetAlternativeIssueTypes = z.input<typeof GetAlternativeIssueTypesSchema>;
