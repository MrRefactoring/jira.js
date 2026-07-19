import type { z } from 'zod';
import { apiObject } from '#/core';
import { CommentSchema } from './comment';
import { LinkedIssueSchema } from './linkedIssue';
import { IssueLinkTypeSchema } from './issueLinkType';

export const LinkIssueRequestJsonSchema = apiObject({
  comment: CommentSchema.optional(),
  inwardIssue: LinkedIssueSchema,
  outwardIssue: LinkedIssueSchema,
  type: IssueLinkTypeSchema,
});

export type LinkIssueRequestJson = z.infer<typeof LinkIssueRequestJsonSchema>;
