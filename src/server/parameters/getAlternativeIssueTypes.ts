import { z } from 'zod';

export const GetAlternativeIssueTypesSchema = z.object({
  /** The issue type id. */
  id: z.string(),
});

export type GetAlternativeIssueTypes = z.input<typeof GetAlternativeIssueTypesSchema>;
