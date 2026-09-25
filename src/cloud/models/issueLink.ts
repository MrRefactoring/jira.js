import { z } from 'zod';
import { apiObject } from '#/core';
import { requiredInResponse } from '#/core/compatibility';
import { LinkedIssueSchema } from './linkedIssue';
import { IssueLinkTypeSchema } from './issueLinkType';

/** Details of a link between issues. */
export const IssueLinkSchema = apiObject({
  /** The ID of the issue link. */
  id: z.string().optional(),
  inwardIssue: LinkedIssueSchema.optional(),
  outwardIssue: LinkedIssueSchema.optional(),
  /** The URL of the issue link. */
  self: z.url().optional(),
  type: requiredInResponse(IssueLinkTypeSchema),
});

export type IssueLink = z.infer<typeof IssueLinkSchema>;
