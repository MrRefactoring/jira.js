import { z } from 'zod';
import { apiObject } from '#/core';
import { LinkedIssueSchema } from './linkedIssue';
import { IssueLinkTypeSchema } from './issueLinkType';
/** Details of a link between issues. */

export const IssueLinkSchema = apiObject({
  /** The ID of the issue link. */
  id: z.string().optional(),
  inwardIssue: LinkedIssueSchema.optional(),
  outwardIssue: LinkedIssueSchema.optional(),
  /** The URL of the issue link. */
  self: z.string().url().optional(),
  type: IssueLinkTypeSchema.optional(),
});

export type IssueLink = z.infer<typeof IssueLinkSchema>;
