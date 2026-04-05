import { z } from 'zod';

/** The ID of an issue type scheme. */
export const IssueTypeSchemeIDSchema = z.object({
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: z.string(),
});

export type IssueTypeSchemeID = z.infer<typeof IssueTypeSchemeIDSchema>;
