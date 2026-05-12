import { z } from 'zod';
import { CommentSchema } from '#/models/comment';
import { LinkedIssueSchema } from '#/models/linkedIssue';
import { IssueLinkTypeSchema } from '#/models/issueLinkType';

export const LinkIssueRequestJsonSchema = z.object({
  comment: CommentSchema.optional(),
  inwardIssue: LinkedIssueSchema,
  outwardIssue: LinkedIssueSchema,
  type: IssueLinkTypeSchema,
});

export type LinkIssueRequestJson = z.infer<typeof LinkIssueRequestJsonSchema>;
