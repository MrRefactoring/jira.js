import { z } from 'zod';

/** The screen scheme for an issue type. */
export const IssueTypeScreenSchemeItemSchema = z.object({
  /**
   * The ID of the issue type or _default_. Only issue types used in classic projects are accepted. When creating an
   * issue screen scheme, an entry for _default_ must be provided and defines the mapping for all issue types without a
   * screen scheme. Otherwise, a _default_ entry can't be provided.
   */
  issueTypeId: z.string(),
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: z.string(),
  /** The ID of the screen scheme. */
  screenSchemeId: z.string(),
});

export type IssueTypeScreenSchemeItem = z.infer<typeof IssueTypeScreenSchemeItemSchema>;
