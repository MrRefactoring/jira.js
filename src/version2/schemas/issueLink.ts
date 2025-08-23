import { z } from 'zod';

/** Details of a link between issues. */
export const IssueLinkSchema = z.object({
  /** The ID of the issue link. */
  id: z.string().optional(),
  /**
   * Provides details about the linked issue. If presenting this link in a user interface, use the `inward` field of the
   * issue link type to label the link.
   */
  inwardIssue: z.unknown(),
  /**
   * Provides details about the linked issue. If presenting this link in a user interface, use the `outward` field of
   * the issue link type to label the link.
   */
  outwardIssue: z.unknown(),
  /** The URL of the issue link. */
  self: z.string().optional(),
  /** The type of link between the issues. */
  type: z.unknown(),
});

export type IssueLink = z.infer<typeof IssueLinkSchema>;
