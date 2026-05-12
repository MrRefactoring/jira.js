import { z } from 'zod';
import { LinkedIssueSchema } from '#/models/linkedIssue';
import { IssueLinkTypeSchema } from '#/models/issueLinkType';

/** Details of a link between issues. */
export const IssueLinkSchema = z.object({
  /** The ID of the issue link. */
  id: z.string().optional(),
  inwardIssue: LinkedIssueSchema.optional(),
  outwardIssue: LinkedIssueSchema.optional(),
  /** The URL of the issue link. */
  self: z.url().optional(),
  type: IssueLinkTypeSchema.optional(),
});

export type IssueLink = z.infer<typeof IssueLinkSchema>;
