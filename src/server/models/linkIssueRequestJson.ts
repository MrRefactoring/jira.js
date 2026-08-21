import type { z } from 'zod';
import { apiObject } from '#/core';
import { CommentJsonSchema } from './commentJson';
import { IssueRefJsonSchema } from './issueRefJson';
import { IssueLinkTypeJsonSchema } from './issueLinkTypeJson';

export const LinkIssueRequestJsonSchema = apiObject({
  comment: CommentJsonSchema.optional(),
  inwardIssue: IssueRefJsonSchema.optional(),
  outwardIssue: IssueRefJsonSchema.optional(),
  type: IssueLinkTypeJsonSchema.optional(),
});

export type LinkIssueRequestJson = z.infer<typeof LinkIssueRequestJsonSchema>;
