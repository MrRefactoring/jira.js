import { z } from 'zod';
import { CommentSchema } from './comment';
import { LinkedIssueSchema } from './linkedIssue';
import { IssueLinkTypeSchema } from './issueLinkType';

export const LinkIssuesParametersSchema = z.object({
  comment: CommentSchema.optional(),
  inwardIssue: LinkedIssueSchema,
  outwardIssue: LinkedIssueSchema,
  type: IssueLinkTypeSchema,
});

export type LinkIssuesParameters = z.infer<typeof LinkIssuesParametersSchema>;
