import { z } from 'zod';

/** The ID or key of a linked issue. */
export const LinkedIssueSchema = z.object({
  /** The fields associated with the issue. */
  fields: z.unknown().optional(),
  /** The ID of an issue. Required if `key` isn't provided. */
  id: z.string().optional(),
  /** The key of an issue. Required if `id` isn't provided. */
  key: z.string().optional(),
  /** The URL of the issue. */
  self: z.string().optional(),
});

export type LinkedIssue = z.infer<typeof LinkedIssueSchema>;
