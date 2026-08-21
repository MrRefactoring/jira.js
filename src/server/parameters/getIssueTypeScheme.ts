import { z } from 'zod';

export const GetIssueTypeSchemeSchema = z.object({
  /** A String containing an issue type scheme's id. */
  schemeId: z.string(),
});

export type GetIssueTypeScheme = z.input<typeof GetIssueTypeSchemeSchema>;
