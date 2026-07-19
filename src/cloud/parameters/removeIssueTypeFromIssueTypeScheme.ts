import { z } from 'zod';

export const RemoveIssueTypeFromIssueTypeSchemeSchema = z.object({
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: z.number(),
  /** The ID of the issue type. */
  issueTypeId: z.number(),
});

export type RemoveIssueTypeFromIssueTypeScheme = z.input<typeof RemoveIssueTypeFromIssueTypeSchemeSchema>;
