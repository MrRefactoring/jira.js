import { z } from 'zod';

/** The ID of an issue type screen scheme. */
export const IssueTypeScreenSchemeIdSchema = z.object({
  /** The ID of the issue type screen scheme. */
  id: z.string(),
});

export type IssueTypeScreenSchemeId = z.infer<typeof IssueTypeScreenSchemeIdSchema>;
