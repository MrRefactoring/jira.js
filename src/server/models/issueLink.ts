import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueRefJsonSchema } from './issueRefJson';
import { IssueLinkTypeJsonSchema } from './issueLinkTypeJson';

export const IssueLinkSchema = apiObject({
  id: z.string().optional(),
  inwardIssue: IssueRefJsonSchema.optional(),
  outwardIssue: IssueRefJsonSchema.optional(),
  self: z.url().optional(),
  type: IssueLinkTypeJsonSchema.optional(),
});

export type IssueLink = z.infer<typeof IssueLinkSchema>;
